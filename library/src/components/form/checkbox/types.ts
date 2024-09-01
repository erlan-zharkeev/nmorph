import { Ref } from 'vue';

export interface INmorphCheckboxOption {
  id?: string;
  disabled?: boolean;
  modelValue?: boolean;
  label?: string;
  design?: NmorphCheckboxDesignType;
}

export type NmorphCheckboxDesignType = 'button' | 'checkbox';

export type NmorphCheckboxGroupSelectedValueInjectionType = Ref<string[]>;
export type NmorphCheckboxGroupChangeCheckboxValueHandlerInjectionType = (
  value: string,
  currentState: string[]
) => void;
