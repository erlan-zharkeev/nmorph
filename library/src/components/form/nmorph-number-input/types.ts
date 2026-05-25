import type { INmorphCommonInputProps } from '@/types';

export interface INmorphNumberInputProps extends INmorphCommonInputProps {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  actionBtnPositionRight?: boolean;
}

export interface INmorphNumberInputEmit {
  (e: 'update:model-value', val: number): void;
}
