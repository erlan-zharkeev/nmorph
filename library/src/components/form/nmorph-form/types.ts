import { NmorphRulesType, useFormValidation } from '@/hooks';

export type NmorphAvailableFormValueType = string | string[] | number | number[] | boolean | boolean[] | Date | Date[];
export type NmorphFormValueType = Record<string, { value: NmorphAvailableFormValueType; rules: NmorphRulesType }>;
export type NmorphFormValidationDataType = ReturnType<typeof useFormValidation>;
