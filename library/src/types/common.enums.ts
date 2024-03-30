export enum NmorphComponentHeight {
  thick = 'thick-component',
  default = 'default-height-component',
  thin = 'thin-component',
}

export enum ComponentDirection {
  row = 'row',
  column = 'column',
}

export interface CommonInputProps {
  height?: keyof typeof NmorphComponentHeight;
  fill?: boolean;
  disabled?: boolean;
}

export enum ShadowType {
  inset = 'inset',
  outset = 'outset',
  combined = 'combined',
}

export enum Color {
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
}
