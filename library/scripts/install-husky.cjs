const { spawnSync } = require('node:child_process');
const { resolve } = require('node:path');

const repoRoot = resolve(__dirname, '..', '..');
const result = spawnSync('husky', ['install', './library/.husky'], {
  cwd: repoRoot,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.error && result.error.code !== 'ENOENT') {
  console.warn(result.error.message);
}

process.exit(0);
