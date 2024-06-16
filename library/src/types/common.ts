export enum NmorphComponentHeight {
  thick = 'thick-component',
  default = 'default-height-component',
  thin = 'thin-component',
}

export type NmorphSortOrderType = keyof typeof NmorphSortOrder | undefined;

export enum NmorphSortOrder {
  ascending = 'ascending',
  descending = 'descending',
}

export enum NmorphComponentDirection {
  row = 'row',
  column = 'column',
}

export interface INmorphCommonInputProps {
  height?: keyof typeof NmorphComponentHeight;
  fill?: boolean;
  disabled?: boolean;
}

export enum NmorphShadowType {
  inset = 'inset',
  outset = 'outset',
  combined = 'combined',
}

export enum NmorphColor {
  accent = 'accent',
  success = 'success',
  error = 'error',
  warning = 'warning',
}

export enum NmorphIconList {
  'eye' = 'eye',
  'eye-blocked' = 'eye-blocked',
  'success' = 'success',
  'error' = 'error',
  'plus' = 'plus',
  'minus' = 'minus',
  'loader' = 'loader',
  'chevron-down' = 'chevron-down',
  'audio' = 'audio',
  'archive' = 'archive',
  'video' = 'video',
  'image' = 'image',
  'doc' = 'doc',
  'enlarge' = 'enlarge',
  'shrink' = 'shrink',
  'rotate-right' = 'rotate-right',
  'rotate-left' = 'rotate-left',
  'zoom-in' = 'zoom-in',
  'zoom-out' = 'zoom-out',
  'time' = 'time',
  'triangle-down' = 'triangle-down',
  'calendar' = 'calendar',
  'chevron-double-down' = 'chevron-double-down',
  'cross' = 'cross',
  'info' = 'info',
  'warning' = 'warning',
  'copy' = 'copy',
  'code' = 'code',
  'search' = 'search',
  'burger' = 'burger',
}

export enum NmorphComponentPosition {
  left = 'left',
  right = 'right',
  top = 'top',
  bottom = 'bottom',
}

export type NmorphPlacementType = keyof typeof NmorphComponentPosition;

export type NmorphDomElementType = HTMLElement | null;

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
