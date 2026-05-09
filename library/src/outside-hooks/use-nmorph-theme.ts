import {
  INmorphStaticColors,
  INmorphColorVariable,
  NmorphThemeMapType,
  INmorphOtherThemeOptions,
  INmorphThemeOptions,
  INmorphThemeInstance,
  INmorphThemeColors,
  NmorphThemeOptionsType,
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
  overlay: '#00000095',
};

const DEFAULT_LIGHT_THEME_COLORS = {
  darkShade: '#c8c9ca',
  main: '#e9ecec',
  lightShade: '#fdfdfd',
  text: '#687b9e',
  scrollThumb: '#687b9e',
  accent: '#4a90e2',
  focusText: '#ffffff',
  placeholderText: '#c1c9cf',
  semiContrastText: '#8a9dc0',
  contrastText: '#b4c4de',
};

const DEFAULT_DARK_THEME_COLORS = {
  darkShade: '#0f1112',
  main: '#1c1f21',
  lightShade: '#292d30',
  text: '#778288',
  scrollThumb: '#778288',
  accent: '#006cb6',
  focusText: '#ffffff',
  placeholderText: '#575757',
  semiContrastText: '#9caab0',
  contrastText: '#c3cdd1',
};

const THEME_KEY = 'nmorph-data-theme';
const DEFAULT_THEME = 'dark';
const DEFAULT_OPTIONS: Required<INmorphThemeOptions> = {
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

export const useNmorphTheme = (customOptions?: INmorphThemeOptions): INmorphThemeInstance => {
  nmorphLog('warn', `NMORPH(v${packageData.version})`);
  const options: Required<INmorphThemeOptions> = {
    themes: customOptions?.themes ?? DEFAULT_OPTIONS.themes,
    defaultTheme: customOptions?.defaultTheme ?? DEFAULT_OPTIONS.defaultTheme,
    saveCurrentThemeToLS: customOptions?.saveCurrentThemeToLS ?? DEFAULT_OPTIONS.saveCurrentThemeToLS,
    darkShadeGeneratorCoefficient:
      customOptions?.darkShadeGeneratorCoefficient ?? DEFAULT_OPTIONS.darkShadeGeneratorCoefficient,
    lightShadeGeneratorCoefficient:
      customOptions?.lightShadeGeneratorCoefficient ?? DEFAULT_OPTIONS.lightShadeGeneratorCoefficient,
    other: customOptions?.other ?? DEFAULT_OPTIONS.other,
  };

  const getDynamicThemeColors = (mainBgColor: string): Pick<INmorphThemeColors, 'darkShade' | 'lightShade'> => {
    try {
      const validBgColor = asHexColor(mainBgColor);
      return {
        darkShade: shadeColor(validBgColor, options.darkShadeGeneratorCoefficient),
        lightShade: shadeColor(validBgColor, options.lightShadeGeneratorCoefficient),
      };
    } catch (e) {
      console.error(e instanceof Error ? e.message : e);
      return {};
    }
  };

  const getDynamicColorVariables = (mainBgColor: string): INmorphColorVariable[] => {
    const dynamicColors = getDynamicThemeColors(mainBgColor);
    return getStaticColorVariables(dynamicColors);
  };

  const getStaticColorVariables = (colors: INmorphStaticColors | INmorphThemeColors): INmorphColorVariable[] => {
    return Object.entries(colors)
      .filter(([, color]) => typeof color === 'string')
      .map(([key, color]) => {
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

    const result: string[] = [];
    Object.entries(themes).forEach(([theme, colors]) => {
      const defaultThemeColors = getStaticColorVariables(DEFAULT_THEME_COLORS);
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

  const createThemeMap = (themes: NmorphThemeOptionsType): NmorphThemeMapType => {
    const themeMap: NmorphThemeMapType = {};

    Object.entries(themes).forEach(([theme, colors]) => {
      themeMap[theme] = [];
      const darkShade = Boolean(colors.darkShade);
      const lightShade = Boolean(colors.lightShade);
      const main = Boolean(colors.main);
      const computeDynamicColors = main && !darkShade && !lightShade;
      if (computeDynamicColors && colors.main) themeMap[theme] = getDynamicColorVariables(colors.main);
      themeMap[theme] = [...themeMap[theme], ...getStaticColorVariables(colors)];
    });

    return themeMap;
  };

  let themeMap = createThemeMap(options.themes);

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = generateVariablesAsString(themeMap, options.other);
  document.head.appendChild(style);

  const updateThemeStyles = () => {
    themeMap = createThemeMap(options.themes);
    style.innerHTML = generateVariablesAsString(themeMap, options.other);
  };

  const setTheme = (theme: string) => {
    currentTheme.value = theme;
    html.setAttribute(THEME_KEY, currentTheme.value);
    options.saveCurrentThemeToLS ? localStorage.setItem(THEME_KEY, theme) : localStorage.removeItem(THEME_KEY);
  };

  const setThemeColors = (theme: string, colors: INmorphThemeColors) => {
    const dynamicColors =
      colors.main && !colors.darkShade && !colors.lightShade ? getDynamicThemeColors(colors.main) : {};
    options.themes[theme] = { ...options.themes[theme], ...colors, ...dynamicColors };
    updateThemeStyles();
  };

  const applyTheme = (theme: string, colors?: INmorphThemeColors) => {
    if (colors) setThemeColors(theme, colors);
    setTheme(theme);
  };

  const currentTheme = ref(options.defaultTheme);
  const html = document.documentElement;

  const lsTheme = localStorage.getItem(THEME_KEY);
  const lsThemeExist = lsTheme ? themeMap[lsTheme] : undefined;

  if (options.saveCurrentThemeToLS && lsThemeExist) {
    currentTheme.value = lsTheme;
  }

  setTheme(currentTheme.value);
  const data = options as INmorphThemeOptions;
  return {
    setTheme,
    setThemeColors,
    applyTheme,
    currentTheme: readonly(currentTheme),
    data,
    getDynamicColorVariables,
  };
};
