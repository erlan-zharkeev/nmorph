import type { INmorphCommonInputProps } from '@/types';

export type NmorphSwitchModelType = boolean | string | number;

export interface INmorphSwitchProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: NmorphSwitchModelType;
  loading?: boolean;
  activeValue?: NmorphSwitchModelType;
  inactiveValue?: NmorphSwitchModelType;
  width?: number | string;
  height?: number | string;
  offset?: number | string;
  thumbHeight?: number | string;
}

export interface INmorphSwitchEmit {
  (e: 'update:model-value', val: boolean | string | number): void;
}
