import { Ref } from 'vue';

export interface INmorphRadioOption {
  disabled?: boolean;
  label?: string;
  value: string;
}

export enum NmorphRadioStyleType {
  'radio-style' = 'radio-style',
  'button' = 'button',
}

export type NmorphRadioGroupSelectedValueInjectionType = Ref<string>;

export type NmorphRadioChangeRadioButtonValueHandlerInjectionType = (value: string) => void;
