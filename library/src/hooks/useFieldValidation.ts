import { NmorphAvailableFormValueType } from '@/components/nmorph-form/types';
import { ref, computed } from 'vue';

export const enum NmorphArrayValidationOperator {
  'contains-one' = 'contains-one',
  'not-contains' = 'not-contains',
  'full-eq' = 'full-eq',
}

export enum NmorphNumberCompareOperator {
  'eq' = 'eq',
  'gte' = 'gte',
  'lte' = 'lte',
  'gt' = 'gt',
  'lt' = 'lt',
}

export enum NmorphBooleanCompareOperator {
  'eq' = 'eq',
  'not-eq' = 'not-eq',
}

export interface INmorphRule {
  pattern?: RegExp;
  numberCompareType?: keyof typeof NmorphNumberCompareOperator;
  booleanCompareType?: keyof typeof NmorphBooleanCompareOperator;
  arrayCompareType?: keyof typeof NmorphArrayValidationOperator;
  compareValue?: number | string | string[];
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
  numberCompareType: keyof typeof NmorphNumberCompareOperator;
  compareValue: number;
}

export interface INmorphRadioGroupValidationRule extends INmorphRule {
  booleanCompareType: NmorphBooleanCompareOperator;
  compareValue: string;
}

export interface INmorphCheckboxGroupValidationRule extends INmorphRule {
  arrayCompareType: keyof typeof NmorphArrayValidationOperator;
  compareValue: string[];
}

export const useFieldValidation = (data: INmorphUseValidationPayload) => {
  const { inputValue, rules } = data;

  const errors = ref<string[]>([]);
  const valid = computed(() => errors.value.length === 0);
  const touched = ref(false);

  const validate = () => {
    if (inputValue === null || !Boolean(rules.length)) return null;
    const value = inputValue;

    const hasRuleKey = (key: string) => rules.length > 0 && key in rules[0];
    const textValidation = typeof value === 'string' && hasRuleKey('pattern');
    const numberValidation = typeof value === 'number' && hasRuleKey('numberCompareType');
    const booleanValidation =
      typeof value === 'string' || (typeof value === 'boolean' && hasRuleKey('booleanCompareType'));
    const arrayValidation = Array.isArray(value) && hasRuleKey('arrayCompareType');

    const wrongType = !numberValidation && !textValidation && !booleanValidation && !arrayValidation;
    if (wrongType) {
      console.warn('The input value and the provided rules do not match');
      return null;
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
        numberCompareType: keyof typeof NmorphNumberCompareOperator
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
        arrayCompareType: keyof typeof NmorphArrayValidationOperator
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
        const match = compareValues(value, rule.compareValue, rule.arrayCompareType);
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }
  };

  return {
    touched,
    valid,
    errors,
    validate,
  };
};
