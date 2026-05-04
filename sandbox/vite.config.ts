import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const svgLoader = require('../library/node_modules/vite-svg-loader')

const sandboxSrc = resolve(__dirname, 'src')
const librarySrc = resolve(__dirname, '../library/src')
const libraryEntry = resolve(librarySrc, 'main.ts')

export default defineConfig({
  plugins: [vue(), svgLoader()],
  optimizeDeps: {
    exclude: ['@nmorph/nmorph-ui-kit'],
  },
  resolve: {
    alias: [
      { find: '@nmorph/nmorph-ui-kit', replacement: libraryEntry },
      { find: '@sandbox', replacement: sandboxSrc },
      { find: '@', replacement: librarySrc },
    ],
  },
  server: {
    host: '0.0.0.0',
    port: 43173,
    strictPort: true,
    open: true,
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 43174,
    strictPort: true,
  },
})
