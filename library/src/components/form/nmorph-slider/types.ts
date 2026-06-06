import type { INmorphCommonInputProps } from '@/types';

export interface INmorphSliderProps extends Omit<INmorphCommonInputProps, 'thickness'> {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  fill?: boolean;
  showTooltip?: boolean;
  thumbWidth?: number;
  sliderHeight?: number | string;
  valueFixedContainerHeight?: number | string;
}

export interface INmorphSliderEmit {
  (e: 'update:model-value', val: number): void;
}
