import {
  body4,
  body3,
  body2,
  body1,
  title4,
  title3,
  title2,
  title1,
  nmorphOutset,
  nmorphInset,
  nmorphCombined,
} from '@/utils';

const mixins = {
  'nmorph-body-4': body4,
  'nmorph-body-3': body3,
  'nmorph-body-2': body2,
  'nmorph-body-1': body1,
  'nmorph-title-4': title4,
  'nmorph-title-3': title3,
  'nmorph-title-2': title2,
  'nmorph-title-1': title1,
  'nmorph--shadow-outset': nmorphOutset,
  'nmorph--shadow-inset': nmorphInset,
  'nmorph--shadow-combined': nmorphCombined,
};

export const getCommonStyles = () => {
  const generateCSS = () => `
    :root {
      --font-size-tiny: 10px;
      --font-size-extra-small: 12px;
      --font-size-small: 13px;
      --font-size-base: 14px;
      --font-size-medium: 16px;
      --font-size-large: 18px;
      --font-size-extra-large: 20px;

      --line-height-line: 1;
      --line-height-compact: 1.3;
      --line-height-regular: 1.5;
      --line-height-loose: 1.7;

      --border-radius-none: 0px;
      --border-radius-20: 2px;
      --border-radius-40: 4px;
      --border-radius-60: 6px;
      --border-radius-80: 8px;
      --border-radius-120: 12px;
      --border-radius-200: 20px;
      --border-radius-999: 99px;
      --border-radius-circular: 50%;
      --default-border-radius: var(--border-radius-40);

      --thick-component: 38px;
      --default-thickness-component: 30px;
      --thin-component: 22px;
      --extra-thin-component: 14px;

      --form-container: 280px;

      --default-indentation-input: 8px;

      --indentation-00: 0;
      --indentation-01: 2px;
      --indentation-02: 4px;
      --indentation-03: 8px;
      --indentation-04: 16px;
      --indentation-05: 24px;

      --base-shadow-blur: calc(var(--base-shadow-width) * var(--base-shadow-blur-coefficient));
      --nmorph-shadow-outset:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
      --nmorph-shadow-inset:
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
      --nmorph-shadow-combined:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color),
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur)
          var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
      --nmorph-shadow-combined-dark:
        var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color),
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur)
          var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-dark-shade-color);
      --nmorph-wrapper-padding: calc(var(--base-shadow-width) * 1.5);

      --transition-04: 0.4s;
      --transition-03: 0.3s;
      --transition-02: 0.2s;
      --transition-01: 0.1s;

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-size-adjust: 100%;
      scroll-behavior: smooth;
      box-sizing: border-box;
      line-height: 1.15;
    }

    * {
      color: var(--nmorph-text-color);
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
      border-style: none;
    }

    body {
      margin: 0;
      width: auto;
      font-family: Helvetica, Roboto, Arial, sans-serif;

      ${body1()}
    }

    h1 {
      margin: 0.67em 0;
      font-size: 2em;
    }

    hr {
      height: 0;
      overflow: visible;
    }

    pre,
    code,
    kbd,
    samp {
      font-size: 1em;
      font-family: monospace;
    }

    sub,
    sup {
      position: relative;
      font-size: 75%;
      line-height: 0;
      vertical-align: baseline;
    }

    sub {
      bottom: -0.25em;
    }

    sup {
      top: -0.5em;
    }

    a {
      background: transparent;
    }

    abbr[title] {
      text-decoration: underline dotted;
      border-bottom: none;
    }

    b,
    strong {
      font-weight: bolder;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      margin: 0;
      font-size: 100%;
      font-family: inherit;
      line-height: 1.15;
      overflow: visible;
      text-transform: none;
    }

    input {
      appearance: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    input[type='number'] {
      appearance: textfield;
    }

    [type='checkbox'],
    [type='radio'] {
      box-sizing: border-box;
      padding: 0;
    }

    textarea {
      overflow: auto;
    }

    progress {
      vertical-align: baseline;
    }

    template,
    [hidden] {
      display: none;
    }

    *::-webkit-scrollbar {
      width: var(--nmorph-native-scrollbar-size, 8px);
      height: var(--nmorph-native-scrollbar-size, 8px);
      background: transparent;
    }

    *::-webkit-scrollbar-button,
    *::-webkit-scrollbar-button:single-button,
    *::-webkit-scrollbar-button:double-button,
    *::-webkit-scrollbar-button:vertical:start:decrement,
    *::-webkit-scrollbar-button:vertical:end:increment,
    *::-webkit-scrollbar-button:horizontal:start:decrement,
    *::-webkit-scrollbar-button:horizontal:end:increment {
      display: none !important;
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      border: 0 !important;
      background: transparent !important;
      background-image: none !important;
      -webkit-appearance: none;
      appearance: none;
    }

    *::-webkit-scrollbar-track {
      background: transparent;
    }

    *::-webkit-scrollbar-thumb {
      border-radius: var(--border-radius-999);
      background: color-mix(in srgb, var(--nmorph-scroll-thumb-color, var(--nmorph-text-color)) 42%, transparent);
    }

    *::-webkit-scrollbar-corner {
      background: transparent;
    }

    html {
      background: var(--nmorph-main-color);
    }

    :root[nmorph-data-theme='light'] {
      --nmorph-scroll-color-scheme: light;
    }

    :root[nmorph-data-theme='dark'] {
      --nmorph-scroll-color-scheme: dark;
    }

    .nmorph-scroll {
      --thumb-color: var(--nmorph-scroll-thumb-color, var(--nmorph-text-color));

      position: relative;
      overflow: hidden;
      color-scheme: var(--nmorph-scroll-color-scheme, light);
    }

    .nmorph-scroll__viewport {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      display: inherit;
      flex-direction: inherit;
      flex-wrap: inherit;
      align-content: inherit;
      align-items: inherit;
      justify-content: inherit;
      gap: inherit;
      grid-auto-flow: inherit;
      grid-template-columns: inherit;
      grid-template-rows: inherit;
      color-scheme: inherit;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .nmorph-scroll__viewport::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
      background: transparent;
    }

    .nmorph-scroll__bar {
      position: absolute;
      z-index: 1;
      border-radius: var(--border-radius-40);
      background: transparent;
      ${nmorphInset()}
      opacity: 0.78;
      transition:
        opacity ease-in-out 0.16s,
        background-color ease-in-out 0.16s;
      touch-action: none;
    }

    .nmorph-scroll__bar--vertical {
      top: 0;
      right: 0;
      width: var(--bar-width);
    }

    .nmorph-scroll__bar--horizontal {
      right: 0;
      bottom: 0;
      left: 0;
      height: var(--bar-height);
    }

    .nmorph-scroll__thumb {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--border-radius-40);
      background-color: var(--thumb-color);
      cursor: pointer;
      transition: background-color ease-in-out 0.16s;
      touch-action: none;
    }

    .nmorph-scroll__thumb--vertical {
      width: 100%;
    }

    .nmorph-scroll__thumb--horizontal {
      height: 100%;
    }

    .nmorph-scroll--show-bars .nmorph-scroll__bar,
    .nmorph-scroll__bar:hover {
      opacity: 1;
    }

    .nmorph-scroll--dragging .nmorph-scroll__thumb {
      cursor: grabbing;
    }

    .nmorph-scroll::-webkit-scrollbar {
      width: var(--bar-width);
      height: var(--bar-height);
      background-color: transparent;
      cursor: pointer;
      transition: width ease-in-out 0.2s;
    }

    .nmorph-scroll::-webkit-scrollbar-button,
    .nmorph-scroll::-webkit-scrollbar-button:single-button,
    .nmorph-scroll::-webkit-scrollbar-button:double-button,
    .nmorph-scroll::-webkit-scrollbar-button:vertical:start:decrement,
    .nmorph-scroll::-webkit-scrollbar-button:vertical:end:increment,
    .nmorph-scroll::-webkit-scrollbar-button:horizontal:start:decrement,
    .nmorph-scroll::-webkit-scrollbar-button:horizontal:end:increment {
      display: none !important;
      width: 0 !important;
      min-width: 0 !important;
      max-width: 0 !important;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      border: 0 !important;
      background: transparent !important;
      background-image: none !important;
      -webkit-appearance: none;
      appearance: none;
    }

    .nmorph-scroll::-webkit-scrollbar-track {
      border-radius: var(--border-radius-40);
      ${nmorphInset()}
    }

    .nmorph-scroll::-webkit-scrollbar-thumb {
      background-color: var(--thumb-color);
      border-radius: var(--border-radius-40);
    }

    .nmorph-scroll::-webkit-scrollbar-corner {
      background-color: transparent;
    }

    .nmorph--basic-component {
      --height: var(--default-thickness-component);

      height: var(--height);
    }

    .nmorph--thin-component {
      --height: var(--thin-component);

      height: var(--height);
    }

    .nmorph--extra-thin-component {
      --height: var(--extra-thin-component);

      height: var(--height);
    }

    .nmorph--thick-component {
      --height: var(--thick-component);

      height: var(--height);
    }

    .nmorph--thin-component.nmorph-native-input {
      ${body3()}
    }

    .nmorph-native-input:focus {
      color: var(--nmorph-focus-text-color);
    }

    .nmorph-native-input:focus::placeholder {
      color: var(--nmorph-focus-text-color);
    }

    .nmorph-native-input::placeholder {
      color: var(--nmorph-placeholder-text-color);
    }

    @supports (-webkit-touch-callout: none) {
      .nmorph-native-input {
        font-size: 16px;
        font-size: max(16px, var(--nmorph-ios-native-input-font-size, 16px));
      }
    }

    .nmorph--fill {
      width: 100%;
    }

    .nmorph--focused {
      .nmorph-icon svg {
        --color: var(--nmorph-focus-text-color);
      }
    }

    .list-enter-active,
    .list-leave-active {
      transition: all var(--transition-02) ease;
    }

    .list-enter-from,
    .list-leave-to {
      transform: translateX(30px);
      opacity: 0;
    }

    .opacity-enter-active,
    .opacity-list-leave-active {
      transition: all var(--transition-02) ease;
    }

    .opacity-enter-from,
    .opacity-leave-to {
      opacity: 0;
    }

    @keyframes slide {
      from {
        left: -50%;
      }

      to {
        left: 100%;
      }
    }

    @keyframes nmorph-skeleton-loading-animation {
      0% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }

  `;
  let css = generateCSS();
  for (const [className, mixin] of Object.entries(mixins)) {
    css += `
.${className} {
  ${mixin()}
}
`;
  }
  return css;
};

export const useCommonStyles = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('nmorph-common-styles')) return;

  const styleElement = document.createElement('style');
  styleElement.id = 'nmorph-common-styles';
  styleElement.innerHTML = getCommonStyles();
  document.head.appendChild(styleElement);
};
