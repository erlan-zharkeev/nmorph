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
