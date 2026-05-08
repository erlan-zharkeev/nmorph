import type { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import { NmorphLibrary } from '../src/main';

setup((app) => {
  app.component('router-link', {
    props: ['to'],
    template: `<a :href="typeof to === 'string' ? to : '#'"><slot /></a>`,
  });
  app.use(NmorphLibrary, {
    i18n: {
      locale: 'en',
    },
  });
});

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
