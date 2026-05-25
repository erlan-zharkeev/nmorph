import type { Ref } from 'vue';
import type { NmorphSelectionControlHeightType } from './common.types';

export interface INmorphCheckboxOption {
  id?: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  design?: NmorphCheckboxDesignType;
  height?: NmorphSelectionControlHeightType;
}

export type NmorphCheckboxDesignType = 'button' | 'checkbox';

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (
  value: string,
  currentState: string[]
) => void;

export interface INmorphRadioOption {
  disabled?: boolean;
  label?: string;
  value: string;
  tabindex?: number;
  height?: NmorphSelectionControlHeightType;
}

export enum NmorphRadioStyleType {
  'radio-style' = 'radio-style',
  'button' = 'button',
}

export type NmorphRadioGroupSelectedValueInjectionType = Ref<string>;

export type NmorphRadioChangeRadioButtonValueHandlerInjectionType = (value: string) => void;
