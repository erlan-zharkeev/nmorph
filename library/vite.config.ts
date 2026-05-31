import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import type { OutputAsset, OutputChunk } from 'rollup';
import { dirname, relative, resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';

const toCssImportPath = (chunkFileName: string, cssFileName: string) => {
  const importPath = relative(dirname(chunkFileName), cssFileName).replace(/\\/g, '/');
  return importPath.startsWith('.') ? importPath : `./${importPath}`;
};

const getChunkCssFileName = (chunkFileName: string, bundle: Record<string, OutputAsset | OutputChunk>) => {
  const cssFileName = chunkFileName.replace(/\.vue\d*\.js$/, '.css');
  return bundle[cssFileName]?.type === 'asset' ? cssFileName : undefined;
};

const injectChunkCss = (): Plugin => ({
  name: 'nmorph-inject-chunk-css',
  enforce: 'post',
  generateBundle(_, bundle) {
    Object.values(bundle).forEach((chunk) => {
      if (chunk.type !== 'chunk') return;
      const chunkCssFileName = getChunkCssFileName(chunk.fileName, bundle);

      if (!chunkCssFileName) return;

      chunk.code = `import '${toCssImportPath(chunk.fileName, chunkCssFileName)}';\n${chunk.code}`;
    });
  },
});

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
      injectChunkCss(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      lib: {
        entry: {
          index: resolve(__dirname, 'src', 'main.ts'),
          plugin: resolve(__dirname, 'src', 'plugin.ts'),
          icons: resolve(__dirname, 'src', 'icons.ts'),
          styles: resolve(__dirname, 'src', 'styles.ts'),
          'emoji/index': resolve(__dirname, 'src', 'emoji', 'index.ts'),
        },
        name: 'library',
        formats: ['es'],
        fileName: (format: string, entryName: string) =>
          entryName === 'index' ? `index.${format}.js` : `${entryName}.js`,
      },
      rollupOptions: {
        external: ['vue', 'vue-i18n'],
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: (chunkInfo) =>
            chunkInfo.name === 'index' || chunkInfo.name === 'main' ? 'index.es.js' : '[name].js',
        },
      },
      assetsInlineLimit: 0,
    },
    resolve: {
      alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
    },
  };
});
