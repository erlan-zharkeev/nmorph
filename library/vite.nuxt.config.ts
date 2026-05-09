import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

export default defineConfig(() => {
  return {
    build: {
      target: 'esnext',
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src', 'nuxt', 'module.ts'),
        formats: ['es'],
        fileName: () => 'nuxt.mjs',
      },
      rollupOptions: {
        external: ['@nuxt/kit'],
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  };
});
