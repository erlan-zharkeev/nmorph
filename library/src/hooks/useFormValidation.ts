import { FormValue } from '@/components/form/types';
import { reactive, watch } from 'vue';
import { useFieldValidation } from '.';
import { deepClone } from '@/utils';

export const useFormValidation = (formData: FormValue, validateFormOnLoad: boolean = false) => {
  const fields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});
  const formToCompare = reactive(deepClone(formData));

  const validateAll = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
  };

  const compareFormData = (oldData: FormValue, newData: FormValue) => {
    const changedFields = Object.keys(newData).filter((key) => {
      const oldValue = oldData[key] ? JSON.stringify(oldData[key]) : null;
      const newValue = JSON.stringify(newData[key]);
      return oldValue !== newValue;
    });
    return changedFields;
  };

  const formUpdateHandler = (data: FormValue) => {
    const changedFields = compareFormData(formToCompare, data);
    changedFields.forEach((fieldName) => {
      const fieldData = data[fieldName];
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
    Object.assign(formToCompare, deepClone(data));
  };

  watch(formData, formUpdateHandler, { deep: true });
  if (validateFormOnLoad) validateAll();

  return {
    fields,
  };
};
