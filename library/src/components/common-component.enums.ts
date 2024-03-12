export enum ControlComponentHeight {
  'thick' = 'thick',
  'thin' = 'thin',
}

export enum ComponentDirection {
  'row' = 'row',
  'column' = 'column',
}

export interface CommonInputProps {
  height?: keyof typeof ControlComponentHeight;
  showValidationIcon?: boolean;
  staticErrorBoxSpace?: boolean;
  fill?: boolean;
  disabled?: boolean;
  label?: string;
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
