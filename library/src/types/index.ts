import { Ref } from 'vue';
import { I18n } from 'vue-i18n';

import { NmorphFormValidationDataType } from '@/components';
import { useNmorphBrowser, useNmorphTheme, useNmorphZIndex } from '@/outside-hooks';

export interface INmorphInstance {
  theme: ReturnType<typeof useNmorphTheme>;
  browser: ReturnType<typeof useNmorphBrowser>;
  zIndex: ReturnType<typeof useNmorphZIndex>;
}

export interface INmorphFromDataExpose {
  formData: NmorphFormValidationDataType;
}

export enum NmorphComponentHeight {
  thick = 'thick-component',
  basic = 'basic-component',
  thin = 'thin-component',
}

export const NmorphSelectionControlHeight = {
  ...NmorphComponentHeight,
  'extra-thin': 'extra-thin-component',
} as const;

export type NmorphSelectionControlHeightType = keyof typeof NmorphSelectionControlHeight;

export type NmorphSortOrderType = keyof typeof NmorphSortOrder | undefined;

export enum AvatarShapeType {
  circle = 'circle',
  square = 'square',
}

export enum NmorphSortOrder {
  ascending = 'ascending',
  descending = 'descending',
}

export enum NmorphComponentDirection {
  row = 'row',
  column = 'column',
}

export interface INmorphCommonInputProps {
  id?: string;
  name?: string;
  autocomplete?: string;
  height?: keyof typeof NmorphComponentHeight;
  disabled?: boolean;
  tabindex?: number;
}

export enum NmorphShadowType {
  inset = 'shadow-inset',
  outset = 'shadow-outset',
  combined = 'shadow-combined',
  'not-defined' = 'shadow-not-defined',
}

export enum NmorphColor {
  accent = 'accent',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export enum NmorphComponentPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type NmorphPlacementSideType = keyof typeof NmorphComponentPosition;
export type NmorphPlacementAlignType = 'start' | 'center' | 'end';
export type NmorphPlacementType = NmorphPlacementSideType | `${NmorphPlacementSideType}-${NmorphPlacementAlignType}`;

export type NmorphDomElementType = HTMLElement | null;

export type NmorphElementDesignType = 'nmorph' | 'common';

export interface INmorphCoords<T> {
  x: T;
  y: T;
}

export enum NmorphImageFit {
  fill = 'fill',
  contain = 'contain',
  cover = 'cover',
  none = 'none',
  'scale-down' = 'scale-down',
}

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

export interface INmorphOptions {
  theme?: INmorphThemeOptions;
  i18n?: INmorphApplyTranslation;
  zIndex?: {
    base?: number;
  };
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

export enum Locale {
  en = 'en',
  ru = 'ru',
  zh = 'zh',
}

export type TranslateType = Partial<Record<keyof typeof Locale, TranslateMessages>> & { en: TranslateMessages };

export interface TranslateMessages {
  [key: string]: TranslateMessages | string;
}

export interface LibraryOptions {
  i18n?: I18n;
}

export interface INmorphApplyTranslation {
  outsideMessagesMerge?: boolean;
  messages?: TranslateType;
  locale?: keyof typeof Locale;
}

export interface INmorphThemeInstance {
  setTheme: (theme: string) => void;
  setThemeColors: (theme: string, colors: INmorphThemeColors) => void;
  applyTheme: (theme: string, colors?: INmorphThemeColors) => void;
  currentTheme: Readonly<Ref<string>>;
  data: INmorphThemeOptions;
  getDynamicColorVariables: (mainBgColor: string) => INmorphColorVariable[];
}

export interface INmorphA11yProps {
  role?: string;
  ariaLabel?: string;
  ariaOrientation?: string;
}

export interface INmorphDimensions {
  width: number;
  height: number;
}

export interface INmorphImage {
  src?: string;
  srcSet?: string;
  fit?: keyof typeof NmorphImageFit;
  alt?: string;
}

export interface INmorphCheckboxOption {
  id?: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  design?: NmorphCheckboxDesignType;
  height?: NmorphSelectionControlHeightType;
}

export type NmorphCheckboxDesignType = 'button' | 'checkbox';

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (
  value: string,
  currentState: string[]
) => void;

export interface INmorphRadioOption {
  disabled?: boolean;
  label?: string;
  value: string;
  tabindex?: number;
  height?: NmorphSelectionControlHeightType;
}

export enum NmorphRadioStyleType {
  'radio-style' = 'radio-style',
  'button' = 'button',
}

export type NmorphRadioGroupSelectedValueInjectionType = Ref<string>;

export type NmorphRadioChangeRadioButtonValueHandlerInjectionType = (value: string) => void;

export enum NmorphSelectionDateType {
  'date' = 'date',
  'dates' = 'dates',
  'daterange' = 'daterange',
}

export type NmorphInnerPickerType = 'calendar' | 'year' | 'month';

export type NmorphDatePickerControlsType = 'decrease' | 'increase';
