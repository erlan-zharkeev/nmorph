import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const svgLoader = require('../library/node_modules/vite-svg-loader')

const sandboxSrc = resolve(__dirname, 'src')
const librarySrc = resolve(__dirname, '../library/src')
const libraryEntry = resolve(librarySrc, 'main.ts')
const serverPort = 43173
const localServerHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]']

const getOpenBrowserUrls = () => {
  if (process.platform !== 'darwin') return []

  try {
    return execFileSync('osascript', [
      '-e',
      `
set tabUrls to {}
if application "Google Chrome" is running then
  tell application "Google Chrome"
    repeat with w in windows
      repeat with t in tabs of w
        set end of tabUrls to URL of t
      end repeat
    end repeat
  end tell
end if
if application "Safari" is running then
  tell application "Safari"
    repeat with w in windows
      repeat with t in tabs of w
        set end of tabUrls to URL of t
      end repeat
    end repeat
  end tell
end if
set AppleScript's text item delimiters to linefeed
return tabUrls as text
`,
    ], { encoding: 'utf8' })
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

const hasOpenSandboxTab = () => getOpenBrowserUrls().some((url) => {
  try {
    const parsedUrl = new URL(url)

    return parsedUrl.protocol === 'http:' && parsedUrl.port === String(serverPort) && localServerHosts.includes(parsedUrl.hostname)
  } catch {
    return false
  }
})

export default defineConfig(({ command }) => ({
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
    port: serverPort,
    strictPort: true,
    open: command === 'serve' && !hasOpenSandboxTab(),
    fs: {
      allow: [resolve(__dirname, '..')],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 43174,
    strictPort: true,
  },
}))
