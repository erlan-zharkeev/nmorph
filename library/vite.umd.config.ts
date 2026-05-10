import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';

export default defineConfig(() => {
  return {
    plugins: [vue(), svgLoader()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    build: {
      target: 'esnext',
      emptyOutDir: false,
      lib: {
        entry: resolve(__dirname, 'src', 'main.ts'),
        name: 'library',
        formats: ['umd'],
        fileName: (format: string) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n'],
        output: {
          globals: {
            vue: 'Vue',
            'vue-i18n': 'VueI18n',
          },
        },
      },
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  };
});
