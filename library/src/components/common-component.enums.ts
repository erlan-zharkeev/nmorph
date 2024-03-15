export enum ControlComponentHeight {
  'thick' = 'thick',
  'default' = 'default',
  'thin' = 'thin',
}

export enum ComponentDirection {
  'row' = 'row',
  'column' = 'column',
}

export interface CommonInputProps {
  height?: keyof typeof ControlComponentHeight;
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
