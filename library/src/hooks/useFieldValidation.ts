import { AvailableFormValueType } from '@/components/form/types';
import { ref, computed } from 'vue';

export const enum CheckboxValidationType {
  'contains-one' = 'contains-one',
  'not-contains' = 'not-contains',
  'full-equal' = 'full-equal',
}

export enum NumberCompareOperator {
  'eq' = 'eq',
  'gte' = 'gte',
  'lte' = 'lte',
  'gt' = 'gt',
  'lt' = 'lt',
}

export enum RadioCompareType {
  'equal' = 'equal',
  'not-equal' = 'not-equal',
}

export interface IRule {
  pattern?: RegExp;
  operator?: keyof typeof NumberCompareOperator;
  radioCompareType?: keyof typeof RadioCompareType;
  checkboxCompareType?: keyof typeof CheckboxValidationType;
  value?: number | string | string[];
  error: string;
}

export type ValidationInputValue = AvailableFormValueType | null;

export type Rules = IRule[];

export interface IUseValidationPayload {
  inputValue: ValidationInputValue;
  rules: Rules | [];
}

export interface ITextValidationRule extends IRule {
  pattern: RegExp;
}

export interface INumberValidationRule extends IRule {
  operator: keyof typeof NumberCompareOperator;
  value: number;
}

export interface IRadioGroupValidationRule extends IRule {
  radioCompareType: RadioCompareType;
  value: string;
}

export interface ICheckboxGroupValidationRule extends IRule {
  checkboxCompareType: keyof typeof CheckboxValidationType;
  value: string[];
}

export const useFieldValidation = (data: IUseValidationPayload) => {
  const { inputValue, rules } = data;

  const errors = ref<string[]>([]);
  const valid = computed(() => errors.value.length === 0);
  const touched = ref(false);
  const showValidation = computed(() => touched.value && Boolean(rules.length));

  const validate = () => {
    if (inputValue === null || !Boolean(rules.length)) return null;
    const value = inputValue;

    const hasRuleKey = (key: string) => rules.length > 0 && key in rules[0];
    const numberValidation = typeof value === 'number' && hasRuleKey('operator');
    const textValidation = typeof value === 'string' && hasRuleKey('pattern');
    const radioGroupValidation = typeof value === 'string' && hasRuleKey('radioCompareType');
    const checkboxGroupValidation = Array.isArray(value) && hasRuleKey('checkboxCompareType');

    const wrongType = !numberValidation && !textValidation && !radioGroupValidation && !checkboxGroupValidation;
    if (wrongType) {
      console.warn('The input value and the provided rules do not match');
      return null;
    }

    if (!touched.value) touched.value = true;

    if (textValidation) {
      const typeInferredRules = rules as ITextValidationRule[];
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
        operator: keyof typeof NumberCompareOperator
      ) => {
        switch (operator) {
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
      const typeInferredRules = rules as INumberValidationRule[];
      errors.value = typeInferredRules.reduce((acc, rule) => {
        const match = compareValues(value, rule.value, rule.operator);
        if (match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (radioGroupValidation) {
      const typeInferredRules = rules as IRadioGroupValidationRule[];
      errors.value = typeInferredRules.reduce((acc, rule) => {
        const match = value === rule.value;
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }

    if (checkboxGroupValidation) {
      const typeInferredRules = rules as ICheckboxGroupValidationRule[];
      const compareValues = (
        inputValue: string[],
        compareValue: string[],
        checkboxCompareType: keyof typeof CheckboxValidationType
      ) => {
        switch (checkboxCompareType) {
          case 'contains-one':
            return inputValue.some((element) => compareValue.includes(element));
          case 'full-equal':
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
        const match = compareValues(value, rule.value, rule.checkboxCompareType);
        if (!match) acc.push(rule.error);
        return acc;
      }, [] as string[]);
    }
  };

  return {
    touched,
    showValidation,
    valid,
    errors,
    validate,
  };
};
