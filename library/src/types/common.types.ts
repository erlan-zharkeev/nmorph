import type { CSSProperties } from 'vue';

export const NmorphComponentThickness = {
  thick: 'thick-component',
  basic: 'basic-component',
  thin: 'thin-component',
} as const;

export type NmorphComponentThickness = keyof typeof NmorphComponentThickness;

export const NmorphSelectionControlThickness = {
  ...NmorphComponentThickness,
  'extra-thin': 'extra-thin-component',
} as const;

export type NmorphSelectionControlThicknessType = keyof typeof NmorphSelectionControlThickness;
export type NmorphSelectionControlPlainThicknessType = NmorphSelectionControlThicknessType;
export type NmorphSelectionControlNmorphThicknessType = NmorphComponentThickness;

export const NmorphComponentDirection = {
  row: 'row',
  column: 'column',
} as const;

export type NmorphComponentDirection = keyof typeof NmorphComponentDirection;

export const NmorphShadowType = {
  inset: 'shadow-inset',
  outset: 'shadow-outset',
  combined: 'shadow-combined',
  'not-defined': 'shadow-not-defined',
} as const;

export type NmorphShadowType = keyof typeof NmorphShadowType;

export const NmorphColor = {
  accent: 'accent',
  success: 'success',
  error: 'error',
  warning: 'warning',
} as const;

export type NmorphColor = keyof typeof NmorphColor;

export const NmorphComponentPosition = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
} as const;

export type NmorphComponentPosition = keyof typeof NmorphComponentPosition;

export type NmorphPlacementSideType = keyof typeof NmorphComponentPosition;
export type NmorphPlacementAlignType = 'start' | 'center' | 'end';
export type NmorphPlacementType = NmorphPlacementSideType | `${NmorphPlacementSideType}-${NmorphPlacementAlignType}`;

export type NmorphDomElementType = HTMLElement | null;

export const NmorphElementDesign = {
  nmorph: 'nmorph',
  plain: 'plain',
} as const;

export type NmorphElementDesignType = keyof typeof NmorphElementDesign;

export const NmorphTypographyVariant = {
  'display-large': 'display-large',
  'display-medium': 'display-medium',
  'title-large': 'title-large',
  title: 'title',
  'title-small': 'title-small',
  'body-large': 'body-large',
  body: 'body',
  'body-small': 'body-small',
  caption: 'caption',
  label: 'label',
  'control-large': 'control-large',
  control: 'control',
  'control-small': 'control-small',
  'control-tiny': 'control-tiny',
} as const;

export type NmorphTypographyVariantType = keyof typeof NmorphTypographyVariant;

export const NmorphTypographyWeight = {
  regular: 'regular',
  medium: 'medium',
  semibold: 'semibold',
  bold: 'bold',
  extrabold: 'extrabold',
} as const;

export type NmorphTypographyWeightType = keyof typeof NmorphTypographyWeight;

export const NmorphTypographyColor = {
  text: 'text',
  'semi-contrast': 'semi-contrast',
  placeholder: 'placeholder',
  focus: 'focus',
  accent: 'accent',
  success: 'success',
  warning: 'warning',
  error: 'error',
  white: 'white',
} as const;

export type NmorphTypographyColorType = keyof typeof NmorphTypographyColor;

export const NmorphTextAlign = {
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  inherit: 'inherit',
} as const;

export type NmorphTextAlignType = keyof typeof NmorphTextAlign;

export interface INmorphCoords<T> {
  x: T;
  y: T;
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

export type NmorphCSSProperties = CSSProperties & Record<`--${string}`, string | number | undefined>;

export interface INmorphCommonInputProps {
  id?: string;
  name?: string;
  autocomplete?: string;
  thickness?: NmorphComponentThickness;
  disabled?: boolean;
  tabindex?: number;
}
