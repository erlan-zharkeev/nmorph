import type { INmorphRadioOption, NmorphRadioStyleType } from '@/types';

export interface INmorphRadioProps extends Omit<INmorphRadioOption, 'value'> {
  value?: string;
  styleType?: keyof typeof NmorphRadioStyleType;
  checked?: boolean;
}
