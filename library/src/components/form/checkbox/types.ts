import { Ref } from 'vue';

export interface INmorphCheckboxOption {
  id: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  styleType?: keyof typeof NmorphCheckboxStyleType;
}

export enum NmorphCheckboxStyleType {
  'checkbox-style' = 'checkbox-style',
  'button-style' = 'button-style',
}

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (
  value: string,
  currentState: string[]
) => void;
