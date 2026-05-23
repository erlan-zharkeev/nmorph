import { reactive, readonly, Ref, ref, watch } from 'vue';
import { useFieldValidation } from '.';
import type { NmorphFormValueType } from '@/components/form/nmorph-form/types';
import type { NmorphValidationInputValueType } from './use-field-validation';

export interface INmorphUseFormValidation {
  formValue: NmorphFormValueType;
  fields: Record<
    string,
    {
      touched: Ref<boolean>;
      valid: Ref<boolean>;
      errors: Ref<string[]>;
      validate: () => void;
    }
  >;
  updateFieldValue: (fieldName: string, value: NmorphValidationInputValueType) => void;
  validateField: (
    fieldName: string,
    inputValue?: NmorphValidationInputValueType
  ) => ReturnType<typeof useFieldValidation> | undefined;
  isFormValid: Ref<boolean>;
  isAnyTouched: Ref<boolean>;
}

const isNativeFile = (value: unknown): value is File => typeof File !== 'undefined' && value instanceof File;

const serializeForCompare = (value: unknown): unknown => {
  if (isNativeFile(value)) {
    return {
      name: value.name,
      size: value.size,
      type: value.type,
      lastModified: value.lastModified,
    };
  }

  if (value instanceof Date) return value.toISOString();
  if (value instanceof RegExp) return value.toString();
  if (typeof value === 'function') return String(value);
  if (Array.isArray(value)) return value.map(serializeForCompare);

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, fieldValue]) => [
        key,
        serializeForCompare(fieldValue),
      ])
    );
  }

  return value;
};

const createFormSnapshot = (formData: NmorphFormValueType) =>
  Object.fromEntries(
    Object.entries(formData).map(([fieldName, fieldData]) => [
      fieldName,
      JSON.stringify(serializeForCompare(fieldData)),
    ])
  );

const getFieldValid = (field: ReturnType<typeof useFieldValidation>) => {
  const valid = field.valid as unknown as boolean | Ref<boolean>;
  return typeof valid === 'boolean' ? valid : valid.value;
};

export const useFormValidation = (
  formData: NmorphFormValueType,
  validateFormOnLoad: boolean = false
): INmorphUseFormValidation => {
  const fields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});

  const silentFields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});

  const formToCompare = reactive<Record<string, string>>(createFormSnapshot(formData));
  const isFormValid = ref(false);
  const isAnyTouched = ref(false);

  const updateFormValidity = () => {
    const silentFieldsValid = Object.values(silentFields).every(getFieldValid);
    const touchedFieldsValid = Object.values(fields).every(getFieldValid);
    isFormValid.value = silentFieldsValid && touchedFieldsValid;
  };

  const silentFullValidation = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      silentFields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      silentFields[fieldName].validate();
    });
    updateFormValidity();
  };

  const validateAll = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
    silentFullValidation();
  };

  const validateField = (fieldName: string, inputValue?: NmorphValidationInputValueType) => {
    const fieldData = formData[fieldName];
    if (!fieldData) return undefined;

    const field = useFieldValidation({
      inputValue: inputValue ?? fieldData.value,
      rules: fieldData.rules,
    });
    field.validate();
    fields[fieldName] = field;
    silentFullValidation();
    isAnyTouched.value = true;
    return field;
  };

  const updateFieldValue = (fieldName: string, value: NmorphValidationInputValueType) => {
    const fieldData = formData[fieldName];
    if (!fieldData) return;

    fieldData.value = value;
    validateField(fieldName, value);
  };

  const compareFormData = (oldData: Record<string, string>, newData: NmorphFormValueType) => {
    const newSnapshot = createFormSnapshot(newData);
    const changedFields = Object.keys(newData).filter((key) => {
      const oldValue = oldData[key] ?? null;
      const newValue = newSnapshot[key];
      return oldValue !== newValue;
    });
    return { changedFields, newSnapshot };
  };

  const formUpdateHandler = (data: NmorphFormValueType) => {
    const { changedFields, newSnapshot } = compareFormData(formToCompare, data);
    changedFields.forEach((fieldName) => {
      const fieldData = data[fieldName];
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
    Object.assign(formToCompare, newSnapshot);
    silentFullValidation();
    isAnyTouched.value = true;
  };

  watch(formData, formUpdateHandler, { deep: true });
  if (validateFormOnLoad) validateAll();

  return {
    formValue: formData,
    fields,
    updateFieldValue,
    validateField,
    isFormValid: readonly(isFormValid),
    isAnyTouched: readonly(isAnyTouched),
  };
};
