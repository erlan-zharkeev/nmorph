import { Rules, useFormValidation } from '@/hooks';

export type AvailableFormValueType = string | string[] | number;
export type FormValue = Record<string, { value: AvailableFormValueType; rules: Rules }>;
export type FormValidationData = ReturnType<typeof useFormValidation>;
