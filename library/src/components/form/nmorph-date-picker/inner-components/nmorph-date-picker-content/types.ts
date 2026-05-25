import type { NmorphSelectedDateModelType } from '@/components';
import type { NmorphSelectionDateType } from '@/types';

export interface INmorphDatePickerContentProps {
  initialDate?: Date;
  selectedValues: NmorphSelectedDateModelType;
  type?: keyof typeof NmorphSelectionDateType;
}

export interface INmorphDatePickerContentEmit {
  (e: 'update-selected-value', selectedValue: NmorphSelectedDateModelType): void;
}
