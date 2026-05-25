import type { Ref } from 'vue';

export interface INmorphColorVariable {
  name: string;
  color: string;
}

export interface INmorphOtherThemeOptions {
  baseShadowWidth?: string;
  baseShadowBlurCoefficient?: string;
}

export interface INmorphThemeOptions {
  themes?: NmorphThemeOptionsType;
  defaultTheme?: string;
  saveCurrentThemeToLS?: boolean;
  darkShadeGeneratorCoefficient?: number;
  lightShadeGeneratorCoefficient?: number;
  other?: INmorphOtherThemeOptions;
}

export type NmorphThemeOptionsType = Record<string, INmorphThemeColors>;

export interface INmorphStaticColors {
  info?: string;
  infoText?: string;
  success?: string;
  successText?: string;
  error?: string;
  errorText?: string;
  warn?: string;
  warnText?: string;
  gray?: string;
  accent?: string;
  scrollThumb?: string;
  white?: string;
  black?: string;
  text?: string;
  overlay?: string;
  focusText?: string;
  placeholderText?: string;
  semiContrastText?: string;
  contrastText?: string;
}

export interface INmorphDynamicColors {
  darkShade?: string;
  lightShade?: string;
}

export interface INmorphThemeColors extends INmorphDynamicColors, INmorphStaticColors {
  main?: string;
}

export type NmorphThemeMapType = Record<string, INmorphColorVariable[]>;

export interface INmorphThemeInstance {
  setTheme: (theme: string) => void;
  setThemeColors: (theme: string, colors: INmorphThemeColors) => void;
  applyTheme: (theme: string, colors?: INmorphThemeColors) => void;
  currentTheme: Readonly<Ref<string>>;
  data: INmorphThemeOptions;
  getDynamicColorVariables: (mainBgColor: string) => INmorphColorVariable[];
}
