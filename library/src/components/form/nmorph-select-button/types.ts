import { Ref } from 'vue';

export type NmorphSelectButtonChangeHandlerInjectionType = (value: string) => void;
export type NmorphSelectButtonSelectedValueInjectionType = Ref<string>;

export interface INmorphSelectButtonOption {
  value: string;
  label?: string;
  disabled?: boolean;
}
