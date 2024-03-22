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

export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type IconName = keyof typeof NmorphIconList | '';
