const { rmSync } = require('node:fs');
const { resolve } = require('node:path');

for (const target of ['.nuxt', '.nuxt-build', '.output', 'dist', 'node_modules']) {
  rmSync(resolve(__dirname, '..', target), { recursive: true, force: true });
}
