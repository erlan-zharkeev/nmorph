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
    backgrounds: {
      default: 'Nmorph dark',
      values: [
        { name: 'Nmorph dark', value: '#1b2023' },
        { name: 'Nmorph light', value: '#e6edf1' },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'Interactive stories for Nmorph UI Kit components. Initial controls mirror component defaults.',
      },
      toc: true,
    },
    options: {
      storySort: {
        order: ['Nmorph', ['Basic', 'Data', 'Feedback', 'Form', 'Navigation', 'Other', 'Providers']],
      },
    },
  },
};

export default preview;
