import type {
  INmorphCheckboxGroupOption,
  INmorphCommonInputProps,
  NmorphComponentDirection,
  NmorphSelectionControlDesignProps,
} from '@/types';

export type INmorphCheckboxGroupProps = Omit<INmorphCommonInputProps, 'thickness'> & {
  modelValue?: string[];
  options?: INmorphCheckboxGroupOption[];
  direction?: keyof typeof NmorphComponentDirection;
} & NmorphSelectionControlDesignProps;

export interface INmorphCheckboxGroupEmit {
  (e: 'update:model-value', val: string[]): void;
}
