import type { INmorphCommonInputProps } from '@/types';
export enum NmorphButtonStyle {
  default = 'default',
  transparent = 'transparent',
}

export enum NmorphButtonType {
  submit = 'submit',
  reset = 'reset',
  button = 'button',
}

export enum NmorphButtonShape {
  default = 'default',
  square = 'square',
  round = 'round',
  circle = 'circle',
}

export interface INmorphButtonProps extends INmorphCommonInputProps {
  styleType?: keyof typeof NmorphButtonStyle;
  color?: string;
  loading?: boolean;
  ripple?: boolean;
  type?: keyof typeof NmorphButtonType;
  text?: string | number;
  accentBgOnHover?: boolean;
  shape?: keyof typeof NmorphButtonShape;
  fill?: boolean;
  tabindex?: number;
}
