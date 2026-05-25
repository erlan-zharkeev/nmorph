import type {
  INmorphCommonInputProps,
  INmorphRadioOption,
  NmorphComponentDirection,
  NmorphRadioStyleType,
  NmorphSelectionControlHeightType,
} from '@/types';

export type NmorphListRadioOptionElementType = Omit<INmorphRadioOption, 'checked'>;

export interface INmorphRadioGroupProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: string;
  options?: NmorphListRadioOptionElementType[];
  styleType?: keyof typeof NmorphRadioStyleType;
  direction?: keyof typeof NmorphComponentDirection;
  height?: NmorphSelectionControlHeightType;
}

export interface INmorphRadioGroupEmit {
  (e: 'update:model-value', val: string): void;
}
