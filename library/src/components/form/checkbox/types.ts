import { Ref } from 'vue';

export interface INmorphCheckboxOption {
  id?: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  design?: keyof typeof NmorphCheckboxStyleType;
}

export enum NmorphCheckboxStyleType {
  checkbox = 'checkbox',
  button = 'button',
}

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (
  value: string,
  currentState: string[]
) => void;
