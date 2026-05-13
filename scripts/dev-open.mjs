import { spawn } from "node:child_process";
import net from "node:net";
import os from "node:os";

const apps = {
  docs: {
    filter: "nmorph-lib-docs",
    label: "lib-docs",
    path: "/",
    port: 43117,
  },
  sandbox: {
    filter: "sandbox",
    label: "sandbox",
    path: "/basic",
    port: 43173,
  },
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const selectedKeys = args.filter((arg) => !arg.startsWith("--"));
const selectedApps = (selectedKeys.length ? selectedKeys : ["docs", "sandbox"]).map(
  (key) => {
    const app = apps[key];

    if (!app) {
      throw new Error(`Unknown dev app "${key}". Use docs or sandbox.`);
    }

    return app;
  },
);

const getAddressScore = ({ address, name }) => {
  const normalizedName = name.toLowerCase();
  let score = 0;

  if (address.startsWith("192.168.")) score += 40;
  if (address.startsWith("10.")) score += 30;
  if (address.startsWith("172.")) score += 20;
  if (normalizedName.includes("ethernet")) score += 15;
  if (normalizedName.includes("wi-fi") || normalizedName.includes("wifi")) score += 15;
  if (normalizedName.includes("wlan")) score += 15;

  if (
    normalizedName.includes("vethernet") ||
    normalizedName.includes("virtual") ||
    normalizedName.includes("docker") ||
    normalizedName.includes("wsl") ||
    normalizedName.includes("hyper-v") ||
    normalizedName.includes("vmware") ||
    normalizedName.includes("virtualbox")
  ) {
    score -= 100;
  }

  return score;
};

const getBrowserHost = () => {
  if (process.env.NMORPH_DEV_HOST) return process.env.NMORPH_DEV_HOST;

  const candidates = Object.entries(os.networkInterfaces())
    .flatMap(([name, entries]) =>
      (entries ?? [])
        .filter((entry) => entry.family === "IPv4" && !entry.internal)
        .map((entry) => ({ address: entry.address, name })),
    )
    .filter(({ address }) => address !== "0.0.0.0" && !address.startsWith("169.254."))
    .sort((a, b) => getAddressScore(b) - getAddressScore(a));

  return candidates[0]?.address ?? "127.0.0.1";
};

const waitForPort = (port, timeoutMs = 120000) =>
  new Promise((resolve, reject) => {
    const startedAt = Date.now();
    let settled = false;

    const check = () => {
      const socket = net.createConnection({ host: "127.0.0.1", port });

      socket.setTimeout(1000);
      socket.once("connect", () => {
        settled = true;
        socket.destroy();
        resolve();
      });
      socket.once("timeout", () => {
        socket.destroy();
      });
      socket.once("error", () => {
        socket.destroy();
      });
      socket.once("close", () => {
        if (settled) return;

        if (Date.now() - startedAt > timeoutMs) {
          settled = true;
          reject(new Error(`Timed out waiting for port ${port}.`));
          return;
        }

        setTimeout(check, 500);
      });
    };

    check();
  });

const openUrl = (url) => {
  const opener =
    process.platform === "win32" ? "cmd" : process.platform === "darwin" ? "open" : "xdg-open";
  const openerArgs = process.platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(opener, openerArgs, { detached: true, stdio: "ignore" });

  child.unref();
};

const browserHost = getBrowserHost();
const urls = selectedApps.map((app) => ({
  ...app,
  url: `http://${browserHost}:${app.port}${app.path}`,
}));
const turboArgs = [
  "run",
  "dev",
  ...selectedApps.map((app) => `--filter=${app.filter}`),
];

if (dryRun) {
  console.log(`browser host: ${browserHost}`);
  console.log(`turbo ${turboArgs.join(" ")}`);
  for (const app of urls) console.log(`${app.label}: ${app.url}`);
  process.exit(0);
}

const turbo = spawn("turbo", turboArgs, {
  shell: process.platform === "win32",
  stdio: "inherit",
});

for (const app of urls) {
  waitForPort(app.port)
    .then(() => {
      console.log(`Opening ${app.label}: ${app.url}`);
      openUrl(app.url);
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const stopTurbo = () => {
  if (!turbo.killed) turbo.kill("SIGINT");
};

process.once("SIGINT", stopTurbo);
process.once("SIGTERM", stopTurbo);

turbo.once("exit", (code, signal) => {
  if (signal) {
    process.exit(0);
    return;
  }

  process.exit(code ?? 0);
});
