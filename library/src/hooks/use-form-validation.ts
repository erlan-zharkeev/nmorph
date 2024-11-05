import { reactive, readonly, Ref, ref, watch } from 'vue';
import { useFieldValidation } from '.';
import { deepClone } from '@/utils';
import { NmorphFormValueType } from '@/components/form/nmorph-form/types';

export interface INmorphUseFormValidation {
  fields: Record<
    string,
    {
      touched: Ref<boolean>;
      valid: Ref<boolean>;
      errors: Ref<string[]>;
      validate: () => void;
    }
  >;
  isFormValid: Ref<boolean>;
  isAnyTouched: Ref<boolean>;
}

export const useFormValidation = (
  formData: NmorphFormValueType,
  validateFormOnLoad: boolean = false
): INmorphUseFormValidation => {
  const fields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});

  const silentFields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});

  const formToCompare = reactive(deepClone(formData));
  const isFormValid = ref(false);
  const isAnyTouched = ref(false);

  const silentFullValidation = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      silentFields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      silentFields[fieldName].validate();
    });
    isFormValid.value = Object.entries(silentFields).every(([_, fieldValue]) => fieldValue.valid);
  };

  const validateAll = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
  };

  const compareFormData = (oldData: NmorphFormValueType, newData: NmorphFormValueType) => {
    const changedFields = Object.keys(newData).filter((key) => {
      const oldValue = oldData[key] ? JSON.stringify(oldData[key]) : null;
      const newValue = JSON.stringify(newData[key]);
      return oldValue !== newValue;
    });
    return changedFields;
  };

  const formUpdateHandler = (data: NmorphFormValueType) => {
    const changedFields = compareFormData(formToCompare, data);
    changedFields.forEach((fieldName) => {
      const fieldData = data[fieldName];
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
    Object.assign(formToCompare, deepClone(data));
    silentFullValidation();
    isAnyTouched.value = true;
  };

  watch(formData, formUpdateHandler, { deep: true });
  if (validateFormOnLoad) validateAll();

  return {
    fields,
    isFormValid: readonly(isFormValid),
    isAnyTouched: readonly(isAnyTouched),
  };
};
