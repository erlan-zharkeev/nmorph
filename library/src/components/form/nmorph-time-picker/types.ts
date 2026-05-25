import type { INmorphCommonInputProps } from '@/types';
export type NmorphTimePickerModelValueType = string | null;

export interface INmorphTimePickerUnit {
  label: string;
  value: number;
  disabled: boolean;
}

export interface INmorphTimeParts {
  hour: number;
  minute: number;
  second: number;
}

export interface INmorphTimePickerProps extends INmorphCommonInputProps {
  modelValue?: NmorphTimePickerModelValueType;
  placeholder?: string;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showSeconds?: boolean;
  minTime?: string;
  maxTime?: string;
  clearable?: boolean;
  zIndex?: number;
  width?: number | string;
}

export interface INmorphTimePickerEmit {
  (e: 'update:model-value', val: NmorphTimePickerModelValueType): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
}
