import { INmorphCommonInputProps } from '@/types';

export interface INmorphSliderProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  showTooltip?: boolean;
}
