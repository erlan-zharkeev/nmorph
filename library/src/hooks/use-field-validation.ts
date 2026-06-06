import type { NmorphAvailableFormValueType } from '@/components/form/nmorph-form/types';
import { type INmorphCustomFileData, type NmorphResolutionType } from '@/components/form/nmorph-file-upload/types';
import { isFileAllowedByTypes } from '@/utils/file-types';
import { ref } from 'vue';

export const NmorphArrayValidationOperator = {
  'contains-one': 'contains-one',
  'not-contains': 'not-contains',
  'full-eq': 'full-eq',
} as const;

export type NmorphArrayValidationOperator = keyof typeof NmorphArrayValidationOperator;

export const NmorphNumberCompareOperator = {
  eq: 'eq',
  gte: 'gte',
  lte: 'lte',
  gt: 'gt',
  lt: 'lt',
} as const;

export type NmorphNumberCompareOperator = keyof typeof NmorphNumberCompareOperator;

export const NmorphBooleanCompareOperator = {
  eq: 'eq',
  'not-eq': 'not-eq',
} as const;

export type NmorphBooleanCompareOperator = keyof typeof NmorphBooleanCompareOperator;

export interface INmorphRule {
  pattern?: RegExp;
  numberCompareType?: keyof typeof NmorphNumberCompareOperator;
  booleanCompareType?: keyof typeof NmorphBooleanCompareOperator;
  arrayCompareType?: keyof typeof NmorphArrayValidationOperator;
  compareValue?: boolean | number | string | string[];
  fileMaxSize?: number;
  fileAllowedTypes?: Array<NmorphResolutionType | string>;
  fileMaxCount?: number;
  error: string;
}

export type NmorphValidationInputValueType = NmorphAvailableFormValueType | null;

export type NmorphRulesType = INmorphRule[];

export interface INmorphUseValidationPayload {
  inputValue: NmorphValidationInputValueType;
  rules: NmorphRulesType | [];
}

export interface INmorphTextValidationRule extends INmorphRule {
  pattern: RegExp;
}

export interface INmorphNumberValidationRule extends INmorphRule {
  numberCompareType: NmorphNumberCompareOperator;
  compareValue: number;
}

export interface INmorphRadioGroupValidationRule extends INmorphRule {
  booleanCompareType: NmorphBooleanCompareOperator;
  compareValue: boolean | string;
}

export interface INmorphCheckboxGroupValidationRule extends INmorphRule {
  arrayCompareType: NmorphArrayValidationOperator;
  compareValue: string[];
}

export interface INmorphFileValidationRule extends INmorphRule {
  fileMaxSize?: number;
  fileAllowedTypes?: Array<NmorphResolutionType | string>;
  fileMaxCount?: number;
}

const isNativeFile = (value: unknown): value is File => typeof File !== 'undefined' && value instanceof File;

const isCustomFileData = (value: unknown): value is INmorphCustomFileData =>
  Boolean(value) && typeof value === 'object' && 'data' in value && isNativeFile((value as INmorphCustomFileData).data);

const getFilesFromValue = (value: NmorphValidationInputValueType): File[] | null => {
  if (isNativeFile(value)) return [value];
  if (!Array.isArray(value)) return null;
  const fileValue = value as unknown[];
  if (fileValue.length === 0) return [];
  if (fileValue.every(isNativeFile)) return fileValue;
  if (fileValue.every(isCustomFileData)) return fileValue.map((fileData) => fileData.data);
  return null;
};

export const useFieldValidation = (data: INmorphUseValidationPayload) => {
  const { inputValue, rules } = data;

  const errors = ref<string[]>([]);
  const valid = ref(false);

  const touched = ref(false);

  const validate = (): void => {
    const rulesExist = Boolean(rules?.length > 0);
    errors.value = [];

    if (!rulesExist) {
      valid.value = true;
      return;
    }

    if (inputValue === null) return;
    const value = inputValue;

    const hasRuleKey = (key: string) => rulesExist && rules.some((rule) => key in rule);

    const textValidation = typeof value === 'string' && hasRuleKey('pattern');
    const numberValidation = typeof value === 'number' && hasRuleKey('numberCompareType');

    const booleanValidation =
      (typeof value === 'string' || typeof value === 'boolean') && hasRuleKey('booleanCompareType');

    const arrayValidation = Array.isArray(value) && hasRuleKey('arrayCompareType');
    const hasFileRules = hasRuleKey('fileMaxSize') || hasRuleKey('fileAllowedTypes') || hasRuleKey('fileMaxCount');
    const filesValue = hasFileRules ? getFilesFromValue(value) : null;
    const fileValidation = hasFileRules && filesValue !== null;

    const wrongType = !numberValidation && !textValidation && !booleanValidation && !arrayValidation && !fileValidation;

    if (wrongType) {
      console.warn('The input value and the provided rules do not match');
      return;
    }

    if (!touched.value) touched.value = true;

    if (textValidation) {
      const typeInferredRules = rules as INmorphTextValidationRule[];
      errors.value = typeInferredRules.reduce((acc, rule) => {
        const match = value.match(rule.pattern);
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (numberValidation) {
      const compareValues = (
        inputValue: number,
        compareValue: number,
        numberCompareType: NmorphNumberCompareOperator
      ) => {
        switch (numberCompareType) {
          case 'eq':
            return inputValue === compareValue;
          case 'gt':
            return inputValue > compareValue;
          case 'lt':
            return inputValue < compareValue;
          case 'lte':
            return inputValue <= compareValue;
          case 'gte':
            return inputValue >= compareValue;
          default:
            break;
        }
      };
      const typeInferredRules = rules as INmorphNumberValidationRule[];
      errors.value = typeInferredRules.reduce((acc, rule) => {
        const match = compareValues(value, rule.compareValue, rule.numberCompareType);
        if (match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (booleanValidation) {
      const typeInferredRules = rules as INmorphRadioGroupValidationRule[];
      errors.value = typeInferredRules.reduce((acc, rule) => {
        let match = false;
        const { compareValue, booleanCompareType } = rule;
        if (booleanCompareType === 'not-eq') {
          match = value === compareValue;
        }
        if (booleanCompareType === 'eq') {
          match = value !== compareValue;
        }
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (arrayValidation) {
      const typeInferredRules = rules as INmorphCheckboxGroupValidationRule[];
      const compareValues = (
        inputValue: string[],
        compareValue: string[],
        arrayCompareType: NmorphArrayValidationOperator
      ) => {
        switch (arrayCompareType) {
          case 'contains-one':
            return inputValue.some((element) => compareValue.includes(element));
          case 'full-eq':
            if (inputValue.length !== compareValue.length) return false;
            const sortedArr1 = [...inputValue].sort();
            const sortedArr2 = [...compareValue].sort();
            return sortedArr1.every((value, index) => value === sortedArr2[index]);
          case 'not-contains':
            return !inputValue.some((element) => compareValue.includes(element));
          default:
            break;
        }
      };

      errors.value = typeInferredRules.reduce((acc, rule) => {
        const match = compareValues(
          value.map((el) => String(el)),
          rule.compareValue,
          rule.arrayCompareType
        );
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (fileValidation) {
      const typeInferredRules = rules as INmorphFileValidationRule[];
      const files = filesValue || [];

      errors.value = typeInferredRules.reduce((acc, rule) => {
        if (typeof rule.fileMaxSize === 'number' && files.some((file) => file.size > rule.fileMaxSize)) {
          acc.push(rule.error);
        }

        if (rule.fileAllowedTypes && files.some((file) => !isFileAllowedByTypes(file, rule.fileAllowedTypes))) {
          acc.push(rule.error);
        }

        if (typeof rule.fileMaxCount === 'number' && files.length > rule.fileMaxCount) {
          acc.push(rule.error);
        }

        return acc;
      }, [] as string[]);
    }

    valid.value = errors.value.length === 0;
  };

  return {
    touched,
    valid,
    errors,
    validate,
  };
};
