import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';

// @ts-expect-error
export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      dts({
        include: ['./src/**/*.ts', './src/**/*.vue'],
        cleanVueFileName: false,
        outDir: './dist',
        insertTypesEntry: true,
        copyDtsFiles: false,
        staticImport: true,
        logLevel: 'silent',
        exclude: ['**/*.spec.ts', '**/*.story.vue', 'node_modules'],
      }),
      svgLoader(),
    ],
    build: {
      target: 'esnext',
      lib: {
        entry: resolve(__dirname, 'src', 'main.ts'),
        name: 'library',
        formats: ['es', 'umd'],
        fileName: (format: string) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n'],
      },
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  };
});
