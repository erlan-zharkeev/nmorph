import type {
  INmorphCommonInputProps,
  INmorphRadioOption,
  NmorphComponentDirection,
  NmorphSelectionControlDesignProps,
} from '@/types';

export type NmorphListRadioOptionElementType = INmorphRadioOption;

export type INmorphRadioGroupProps = Omit<INmorphCommonInputProps, 'thickness'> & {
  modelValue?: string;
  options?: NmorphListRadioOptionElementType[];
  direction?: keyof typeof NmorphComponentDirection;
} & NmorphSelectionControlDesignProps;

export interface INmorphRadioGroupEmit {
  (e: 'update:model-value', val: string): void;
}
