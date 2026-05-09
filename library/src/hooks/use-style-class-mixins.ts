import { body3, body2, body1, title3, title2, title1, nmorphOutset, nmorphInset, nmorphCombined } from '@/utils';

const mixins = {
  'nmorph-body-3': body3,
  'nmorph-body-2': body2,
  'nmorph-body-1': body1,
  'nmorph-title-3': title3,
  'nmorph-title-2': title2,
  'nmorph-title-1': title1,
  'nmorph--shadow-outset': nmorphOutset,
  'nmorph--shadow-inset': nmorphInset,
  'nmorph--shadow-combined': nmorphCombined,
};

export const useStyleClassMixins = () => {
  if (typeof document === 'undefined') return;

  const generateCSS = () => {
    let css = '';

    for (const [className, mixin] of Object.entries(mixins)) {
      css += `
.${className} {
    ${mixin()}
  }
  `;
    }

    return css;
  };

  const styleElement = document.createElement('style');
  styleElement.innerHTML = generateCSS();
  document.head.appendChild(styleElement);
};
