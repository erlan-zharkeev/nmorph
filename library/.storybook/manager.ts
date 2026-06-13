import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

const brandImage = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="208" height="44" viewBox="0 0 208 44" fill="none">
  <defs>
    <linearGradient id="nmorphLogoGradient" x1="0" y1="0" x2="72" y2="44" gradientUnits="userSpaceOnUse">
      <stop stop-color="#ff0096"/>
      <stop offset="1" stop-color="#00ccff"/>
    </linearGradient>
  </defs>
  <path d="M23.98 8.64V35h-3.1L6.51 14.29h-.26V35h-3.2V8.64h3.1l14.43 20.76h.26V8.64h3.14Zm-3.1 0h3.82l8.96 21.9h.31l8.97-21.9h3.81V35h-2.99V14.97h-.25L35.27 35h-2.89l-8.24-20.03h-.26V35h-2.99V8.64Z" fill="url(#nmorphLogoGradient)"/>
  <text x="58" y="22" fill="#f3f6f8" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">Nmorph UI Kit</text>
  <text x="58" y="36" fill="#9aa8b2" font-family="Inter, Arial, sans-serif" font-size="10" font-weight="600">Vue 3 / Nuxt components</text>
</svg>
`)}`;

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
  theme: create({
    base: 'dark',
    brandTitle: 'Nmorph UI Kit',
    brandUrl: 'https://gitlab.com/ketjo/nmorph',
    brandImage,
    brandTarget: '_blank',
    colorPrimary: '#578bd6',
    colorSecondary: '#578bd6',
    appBg: '#161b1e',
    appContentBg: '#1b2023',
    appBorderColor: '#2f383e',
    appBorderRadius: 4,
    textColor: '#dce4ea',
    textMutedColor: '#94a2ac',
    barTextColor: '#b8c4cc',
    barSelectedColor: '#578bd6',
    barBg: '#171c1f',
    inputBg: '#1f2529',
    inputBorder: '#354047',
    inputTextColor: '#dce4ea',
    inputBorderRadius: 4,
  }),
});
