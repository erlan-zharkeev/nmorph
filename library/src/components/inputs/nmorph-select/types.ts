import { Ref } from 'vue';

export type NmorphSelectModelValueType = string | string[];

export type NmorphSelectSelectedValueInjectionType = Ref<NmorphSelectModelValueType>;
export type NmorphSelectChangeSelectedValue = (value: string) => void;
