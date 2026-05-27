import { INmorphCommonInputProps } from '@/types';
import { Ref } from 'vue';

export type NmorphSelectSingleModelValueType = string;
export type NmorphSelectMultipleModelValueType = string[];
export type NmorphSelectEmptyValueType = '' | null;
export type NmorphSelectModelValueType<TMultiple extends boolean = boolean> = TMultiple extends true
  ? NmorphSelectMultipleModelValueType
  : TMultiple extends false
    ? NmorphSelectSingleModelValueType | NmorphSelectEmptyValueType
    : NmorphSelectSingleModelValueType | NmorphSelectMultipleModelValueType | NmorphSelectEmptyValueType;

export type NmorphSelectSelectedValueInjectionType = Ref<NmorphSelectModelValueType>;
export type NmorphSelectChangeSelectedValue = (value: string) => void;

export interface INmorphSelectOption extends INmorphCommonInputProps {
  value: string;
  label: string;
  focused?: boolean;
  hoverBackground?: string;
  hoverColor?: string;
}

export interface INmorphSelectProps<TMultiple extends boolean = boolean> extends INmorphCommonInputProps {
  noElementPlaceholder?: string;
  valueRequired?: boolean;
  options?: INmorphSelectOption[];
  optionsMap?: INmorphSelectOption[];
  modelValue?: NmorphSelectModelValueType<TMultiple>;
  multiple?: TMultiple;
  nullable?: boolean;
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

export interface INmorphSelectEmit<TMultiple extends boolean = boolean> {
  (e: 'update:model-value', val: NmorphSelectModelValueType<TMultiple>): void;
}
