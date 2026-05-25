import type { INmorphCommonInputProps } from '@/types';

export interface INmorphColorPickerProps extends INmorphCommonInputProps {
  modelValue?: string;
  showValue?: boolean;
  displayFormat?: 'hex' | 'rgb' | 'hsl';
}

export interface INmorphColorPickerEmit {
  (e: 'update:model-value', val: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}
