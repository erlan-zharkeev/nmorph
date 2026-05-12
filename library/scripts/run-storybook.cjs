const { spawnSync } = require('node:child_process');
const { tmpdir } = require('node:os');
const { join } = require('node:path');

const storybookHome =
  process.platform === 'win32' ? join(tmpdir(), 'nmorph-storybook-home') : '/tmp/nmorph-storybook-home';

const result = spawnSync('storybook', process.argv.slice(2), {
  env: {
    ...process.env,
    HOME: storybookHome,
    STORYBOOK_DISABLE_TELEMETRY: '1',
  },
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
