import { config } from '@vue/test-utils';
import { afterEach, vi } from 'vitest';
import { NmorphLibrary } from '../src/main';

const consoleLog = console.log;
const consoleWarn = console.warn;

vi.spyOn(console, 'log').mockImplementation((message, ...args) => {
  if (String(message).includes('NMORPH(')) return;
  consoleLog(message, ...args);
});

vi.spyOn(console, 'warn').mockImplementation((message, ...args) => {
  if (String(message).includes('There is no relative element or content DOM element')) return;
  consoleWarn(message, ...args);
});

config.global.plugins = [
  [
    NmorphLibrary,
    {
      i18n: {
        locale: 'en',
      },
    },
  ],
];

config.global.stubs = {
  Teleport: true,
  teleport: true,
  RouterLink: {
    props: ['to', 'replace'],
    template: "<a :href=\"typeof to === 'string' ? to : '#'\"><slot /></a>",
  },
  'router-link': {
    props: ['to', 'replace'],
    template: "<a :href=\"typeof to === 'string' ? to : '#'\"><slot /></a>",
  },
};

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = vi.fn();
}

afterEach(() => {
  document.body.innerHTML = '';
  document.head.querySelectorAll('style').forEach((styleElement) => styleElement.remove());
  vi.clearAllMocks();
});
