import type { NmorphRulesType } from '@/hooks/use-field-validation';
import type { INmorphUseFormValidation } from '@/hooks/use-form-validation';
import type { INmorphCustomFileData } from '../nmorph-file-upload/types';
import type { ComputedRef, Ref } from 'vue';

export type NmorphFileFormValueType = File | File[] | INmorphCustomFileData[];
export type NmorphAvailableFormValueType<TCustomValue = never> =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | Date
  | Date[]
  | null
  | NmorphFileFormValueType
  | TCustomValue;
export type NmorphFormFieldType<TValue = NmorphAvailableFormValueType> = {
  value: TValue;
  rules: NmorphRulesType;
};
export type NmorphFormValueType<TValue = NmorphAvailableFormValueType> = Record<string, NmorphFormFieldType<TValue>>;
export type NmorphFormValidationDataType = INmorphUseFormValidation;

export interface NmorphFormItemInputDataType {
  id: Ref<string>;
  name: Ref<string>;
  autocomplete: Ref<string | undefined>;
  value: ComputedRef<NmorphAvailableFormValueType | undefined>;
  rules: ComputedRef<NmorphRulesType>;
  errors: ComputedRef<string[]>;
  valid: ComputedRef<boolean>;
  touched: ComputedRef<boolean>;
  updateValue: (value: NmorphAvailableFormValueType) => void;
  validate: (value?: NmorphAvailableFormValueType) => void;
}

export interface INmorphFormProps {
  value: NmorphFormValueType;
  validateImmediately?: boolean;
}
