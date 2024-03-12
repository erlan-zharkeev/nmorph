export enum NmorphIconList {
  'eye' = 'eye',
  'eye-blocked' = 'eye-blocked',
  'success' = 'success',
  'error' = 'error',
  'plus' = 'plus',
  'minus' = 'minus',
}

export enum IconSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export type IconName = keyof typeof NmorphIconList | '';
