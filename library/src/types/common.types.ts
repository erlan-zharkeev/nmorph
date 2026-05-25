import type { CSSProperties } from 'vue';

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

export enum NmorphComponentDirection {
  row = 'row',
  column = 'column',
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
  height?: keyof typeof NmorphComponentHeight;
  disabled?: boolean;
  tabindex?: number;
}
