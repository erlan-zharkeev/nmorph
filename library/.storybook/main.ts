import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import svgLoader from 'vite-svg-loader';

const storybookDir = dirname(fileURLToPath(import.meta.url));
const libraryRoot = resolve(storybookDir, '..');

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: {
        plugin: 'vue-component-meta',
        tsconfig: 'tsconfig.json',
      },
    },
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: '.storybook/vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [vue(), svgLoader()],
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern',
          },
        },
      },
      resolve: {
        alias: {
          '@': resolve(libraryRoot, 'src'),
        },
      },
      server: {
        fs: {
          allow: [libraryRoot],
        },
      },
    });
  },
};

export default config;
