import { reactive, ref, watch } from 'vue';
import { useFieldValidation } from '.';
import { deepClone } from '@/utils';
import { NmorphFormValueType } from '@/components/form/nmorph-form/types';

export const useFormValidation = (formData: NmorphFormValueType, validateFormOnLoad: boolean = false) => {
  const fields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});
  const formToCompare = reactive(deepClone(formData));
  const initialFormData = ref(formData);
  const isFullValid = ref(false);

  const checkForFullValidation = () => {
    const totalFieldQuantity = Object.keys(initialFormData.value).length;
    const touchedFieldsQuantity = Object.keys(fields).length;
    if (totalFieldQuantity > touchedFieldsQuantity) return;
    isFullValid.value = Object.entries(fields).every(([_, fieldValue]) => fieldValue.valid);
  };

  const validateAll = () => {
    Object.entries(formData).forEach(([fieldName, fieldData]) => {
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      fields[fieldName].validate();
    });
    checkForFullValidation();
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
    checkForFullValidation();
  };

  watch(formData, formUpdateHandler, { deep: true });
  if (validateFormOnLoad) validateAll();

  return {
    fields,
    isFullValid,
  };
};
