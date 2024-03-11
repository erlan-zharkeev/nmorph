import { ref, computed, Ref, watch } from 'vue';

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

export interface IRule {
  error: string;
}

export interface ICheckboxGroupValidationRule extends IRule {
  checkboxCompareType: keyof typeof CheckboxValidationType;
  value: string[];
}

export interface ITextValidationRule extends IRule {
  pattern: RegExp;
}

export interface INumberValidationRule extends IRule {
  operator: keyof typeof NumberCompareOperator;
  value: number;
}

export interface IRadioGroupValidationRule extends IRule {
  radioCompareType: 'equal' | 'not-equal';
  value: string;
}

interface IUseTextValidationPayload {
  inputValue: Ref<string>;
  rules: ITextValidationRule[];
}

interface IUseNumberValidationPayload {
  inputValue: Ref<number>;
  rules: INumberValidationRule[];
}

interface IUseCheckboxGroupValidationPayload {
  inputValue: Ref<string[]>;
  rules: ICheckboxGroupValidationRule[];
}

interface IUseRadioGroupValidationPayload {
  inputValue: Ref<string>;
  rules: IRadioGroupValidationRule[];
}

type IUseValidationPayload =
  | IUseTextValidationPayload
  | IUseNumberValidationPayload
  | IUseCheckboxGroupValidationPayload
  | IUseRadioGroupValidationPayload;

export const useValidation = ({ inputValue, rules }: IUseValidationPayload) => {
  const errors = ref<string[]>([]);
  const valid = computed(() => errors.value.length === 0);
  const touched = ref(false);
  const showValidation = computed(() => touched.value && Boolean(rules.length));

  const validationHandler = (value: unknown) => {
    if (!touched.value) touched.value = true;

    const textValidation = typeof value === 'string' && 'pattern' in rules[0];
    const numberValidation = typeof value === 'number';
    const radioGroupValidation = typeof value === 'string' && 'radioCompareType' in rules[0];
    const checkboxGroupValidation = Array.isArray(value) && 'checkboxCompareType' in rules[0];

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

  watch(inputValue, validationHandler, { deep: true });

  return {
    touched,
    showValidation,
    valid,
    errors,
  };
};
