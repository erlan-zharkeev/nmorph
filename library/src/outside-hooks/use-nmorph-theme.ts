import {
  INmorphStaticColors,
  INmorphColorVariable,
  NmorphThemeMapType,
  INmorphOtherThemeOptions,
  INmorphThemeOptions,
  INmorphThemeInstance,
} from '@/main';
import { readonly, ref } from 'vue';
import packageData from '../../package.json';
import { nmorphLog } from '@/outside-utils';
import { camelToKebab } from '@/utils';

const DEFAULT_THEME_COLORS = {
  info: '#d4e5edbb',
  infoText: '#506c80',
  success: '#67C23A',
  successText: '#0b5b1d',
  error: '#F56C6C',
  errorText: '#8d3333',
  warn: '#E6A21C',
  warnText: '#7a6712',
  gray: '#c9d2dee6',
  white: '#ffffff',
  black: '#000000',
  overlay: '#00000095'
}

const DEFAULT_LIGHT_THEME_COLORS = {
  darkShade: '#c8c9ca',
  main: '#e9ecec',
  lightShade: '#fdfdfd',
  text: '#687b9e',
  accent: '#4a90e2',
  focusText: '#ffffff',
  placeholderText: '#c1c9cf',
};

const DEFAULT_DARK_THEME_COLORS = {
  darkShade: '#0f1112',
  main: '#1c1f21',
  lightShade: '#292d30',
  text: '#778288',
  accent: '#006cb6',
  focusText: '#ffffff',
  placeholderText: '#575757',
};

const THEME_KEY = 'nmorph-data-theme';
const DEFAULT_THEME = 'dark';
const DEFAULT_OPTIONS = {
  themes: {
    common: DEFAULT_THEME_COLORS,
    light: DEFAULT_LIGHT_THEME_COLORS,
    dark: DEFAULT_DARK_THEME_COLORS,
  },
  defaultTheme: DEFAULT_THEME,
  saveCurrentThemeToLS: true,
  darkShadeGeneratorCoefficient: -45,
  lightShadeGeneratorCoefficient: 45,
  other: {
    baseShadowWidth: '3.5px',
    baseShadowBlurCoefficient: '2',
  },
};

const isValidHexColor = (value: string) => {
  const hexColorPattern = /^#[0-9A-Fa-f]{6}$/;
  return hexColorPattern.test(value);
};

const asHexColor = (value: string) => {
  if (!isValidHexColor(value)) throw new Error(`Invalid hex color: ${value}`);
  return value;
};

const mergeColorVariables = (
  defaultColors: INmorphColorVariable[],
  overrideColors: INmorphColorVariable[]
): INmorphColorVariable[] => {
  const colorMap: Record<string, string> = {};

  defaultColors.forEach(({ name, color }) => {
    colorMap[name] = color;
  });

  overrideColors.forEach(({ name, color }) => {
    colorMap[name] = color;
  });

  return Object.entries(colorMap).map(([name, color]) => ({ name, color }));
};

const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round(R * (1 + percent / 100));
  G = Math.round(G * (1 + percent / 100));
  B = Math.round(B * (1 + percent / 100));

  R = Math.min(255, Math.max(0, R));
  G = Math.min(255, Math.max(0, G));
  B = Math.min(255, Math.max(0, B));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
};

export const useNmorphTheme = (customOptions: INmorphThemeOptions): INmorphThemeInstance => {
  nmorphLog('warn', `NMORPH(v${packageData.version})`);
  const options = { ...DEFAULT_OPTIONS, ...customOptions };

  const getDynamicColorVariables = (mainBgColor: string): INmorphColorVariable[] => {
    try {
      const validBgColor = asHexColor(mainBgColor);
      const darkerColor = shadeColor(validBgColor, options.darkShadeGeneratorCoefficient);
      const lighterColor = shadeColor(validBgColor, options.lightShadeGeneratorCoefficient);
      return [
        { name: '--nmorph-dark-shade-color', color: darkerColor },
        { name: '--nmorph-light-shade-color', color: lighterColor },
      ];
    } catch (e) {
      console.error(e.message);
    }
  };

  const getStaticColorVariables = (colors: INmorphStaticColors): INmorphColorVariable[] => {
    return Object.entries(colors).map(([key, color]) => {
      return {
        name: `--nmorph-${camelToKebab(key)}-color`,
        color,
      };
    });
  };

  const generateVariablesAsString = (themes: NmorphThemeMapType, otherVariables: INmorphOtherThemeOptions): string => {
    const convertColorsToString = (colors: INmorphColorVariable[]) =>
      colors.map((colorObj) => `${colorObj.name}: ${colorObj.color};`).join(' ');

    const transformedOtherVariables = Object.entries(otherVariables)
      .map(([name, value]) => `--${camelToKebab(name)}: ${value};`)
      .join(' ');

    const result = [];
    Object.entries(themes).forEach(([theme, colors]) => {
      const defaultThemeColors = getStaticColorVariables(DEFAULT_THEME_COLORS)
      if (theme === 'common') result.push(convertColorsToString(mergeColorVariables(defaultThemeColors, colors)));
      else {
        const themeColors = `
          &[${THEME_KEY}='${theme}'] {
            ${convertColorsToString(colors)}
          }
        `;
        result.push(themeColors);
      }
    });
    return `
      :root {
        ${result.join(' ')}
        ${transformedOtherVariables}
      }
    `;
  };

  const themeMap: NmorphThemeMapType = {};
  Object.entries(options.themes).forEach(([theme, colors]) => {
    themeMap[theme] = [];
    const darkShade = Boolean(colors.darkShade);
    const lightShade = Boolean(colors.lightShade);
    const main = Boolean(colors.main);
    const computeDynamicColors = main && !darkShade && !lightShade;
    if (computeDynamicColors) themeMap[theme] = getDynamicColorVariables(colors.main);
    themeMap[theme] = [...themeMap[theme], ...getStaticColorVariables(colors)];

  });

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = generateVariablesAsString(themeMap, options.other);
  document.head.appendChild(style);

  const setTheme = (theme: string) => {
    currentTheme.value = theme;
    html.setAttribute(THEME_KEY, currentTheme.value);
    options.saveCurrentThemeToLS ? localStorage.setItem(THEME_KEY, theme) : localStorage.removeItem(THEME_KEY);
  };

  const currentTheme = ref(options.defaultTheme);
  const html = document.querySelector('html');

  const lsTheme = localStorage.getItem(THEME_KEY);
  const lsThemeExist = themeMap[lsTheme];

  if (options.saveCurrentThemeToLS && lsThemeExist) {
    currentTheme.value = localStorage.getItem(THEME_KEY);
  }

  setTheme(currentTheme.value);
  const data = options as INmorphThemeOptions;
  return { setTheme, currentTheme: readonly(currentTheme), data, getDynamicColorVariables };
};
