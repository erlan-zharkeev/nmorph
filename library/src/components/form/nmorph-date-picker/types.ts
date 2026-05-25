import type { NmorphDateFormatterType, NmorphSelectedDateModelType } from '@/components';
import type { INmorphCommonInputProps, NmorphSelectionDateType } from '@/types';

export interface INmorphDatePickerProps extends INmorphCommonInputProps {
  placeholder?: string;
  modelValue?: NmorphSelectedDateModelType;
  type?: keyof typeof NmorphSelectionDateType;
  textSeparator?: string;
  initialDate?: Date;
  zIndex?: number;
  dateLocale?: string | string[];
  dateFormatOptions?: Intl.DateTimeFormatOptions;
  dateFormat?: string;
  dateFormatter?: NmorphDateFormatterType;
  valueSeparator?: string;
  rangeSeparator?: string;
  width?: number | string;
  calendarCellHeight?: number | string;
}

export interface INmorphDatePickerEmit {
  (e: 'update:model-value', modelValue: NmorphSelectedDateModelType): void;
}
