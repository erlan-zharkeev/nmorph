import { INmorphCommonInputProps } from '@/types';
import { Ref } from 'vue';

export type NmorphSelectModelValueType = string | string[];

export type NmorphSelectSelectedValueInjectionType = Ref<NmorphSelectModelValueType>;
export type NmorphSelectChangeSelectedValue = (value: string) => void;

export interface INmorphSelectOption extends INmorphCommonInputProps {
  value: string;
  label: string;
  focused?: boolean;
  hoverBackground?: string;
  hoverColor?: string;
}

export interface INmorphSelectProps extends INmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: INmorphSelectOption[];
  optionsMap?: INmorphSelectOption[];
  modelValue?: NmorphSelectModelValueType;
  loading?: boolean;
  open?: boolean;
  fill?: boolean;
  optionsWidth?: 'truncate' | 'auto';
  zIndex?: number;
  virtual?: boolean;
  virtualItemHeight?: number;
  virtualMaxHeight?: number | string;
  virtualOverscan?: number;
  virtualDynamicHeight?: boolean;
  width?: number | string;
}

export interface INmorphSelectEmit {
  (e: 'update:model-value', val: NmorphSelectModelValueType): void;
}
