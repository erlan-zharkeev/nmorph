import { INmorphUseFormValidation, NmorphRulesType } from '@/hooks';
import { Ref } from 'vue';

export type NmorphAvailableFormValueType = string | string[] | number | number[] | boolean | boolean[] | Date | Date[];
export type NmorphFormValueType = Record<string, { value: NmorphAvailableFormValueType; rules: NmorphRulesType }>;
export type NmorphFormValidationDataType = INmorphUseFormValidation;

export interface NmorphFormItemInputDataType {
  id: Ref<string>;
  name: Ref<string>;
}
