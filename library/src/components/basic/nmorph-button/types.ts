import type { INmorphCommonInputProps, NmorphElementDesignType } from '@/types';

export const NmorphButtonType = {
  submit: 'submit',
  reset: 'reset',
  button: 'button',
} as const;

export type NmorphButtonType = keyof typeof NmorphButtonType;

export const NmorphButtonShape = {
  default: 'default',
  square: 'square',
  round: 'round',
  circle: 'circle',
} as const;

export type NmorphButtonShape = keyof typeof NmorphButtonShape;

export interface INmorphButtonProps extends INmorphCommonInputProps {
  design?: NmorphElementDesignType;
  color?: string;
  loading?: boolean;
  ripple?: boolean;
  type?: NmorphButtonType;
  text?: string | number;
  accentBgOnHover?: boolean;
  shape?: NmorphButtonShape;
  fill?: boolean;
  tabindex?: number;
  toggle?: boolean;
  modelValue?: boolean;
  active?: boolean;
  danger?: boolean;
}

export interface INmorphButtonEmit {
  (e: 'update:model-value', val: boolean): void;
}
