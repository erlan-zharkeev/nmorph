import type {
  INmorphCheckboxOption,
  INmorphCommonInputProps,
  NmorphCheckboxDesignType,
  NmorphComponentDirection,
  NmorphSelectionControlHeightType,
} from '@/types';

export interface INmorphCheckboxGroupProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: string[];
  options?: INmorphCheckboxOption[];
  design?: NmorphCheckboxDesignType;
  direction?: keyof typeof NmorphComponentDirection;
  height?: NmorphSelectionControlHeightType;
}

export interface INmorphCheckboxGroupEmit {
  (e: 'update:model-value', val: string[]): void;
}
