import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  plugins: [HstVue()],
  defaultStoryProps: {
    autoPropsDisabled: true,
  },
  outDir: 'dist',
  vite: {
    server: {
      port: 9009,
      proxy: {
        '/story/fonts': {
          target: 'http://localhost:3000/fonts',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/story\/fonts/, ''),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/main.scss";
          @import "./src/stories/styles/histoire.scss";`,
        },
      },
    },
  },
  theme: {
    title: 'nmorph ui kit',
    // favicon: '/images/WL-logo.svg',
    logo: {
      // square: '/images/WL-logo.svg',
      // light: '/images/WL-logo.svg',
      // dark: '/images/WL-logo.svg',
    },
    logoHref: '/',
    defaultColorScheme: 'light',
    hideColorSchemeSwitch: true,
    storeColorScheme: false,
  },
});
