import { INmorphCommonInputProps } from '@/types/common';
import { Ref } from 'vue';

export type NmorphSelectModelValueType = string | string[];

export type NmorphSelectSelectedValueInjectionType = Ref<NmorphSelectModelValueType>;
export type NmorphSelectChangeSelectedValue = (value: string) => void;

export interface INmorphSelectOption extends Omit<INmorphCommonInputProps, 'fill'> {
  value: string;
  label: string;
}
