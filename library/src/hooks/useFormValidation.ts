import { FormValue } from '@/components/form/types';
import { reactive, watch } from 'vue';
import { useFieldValidation } from '.';

export const useFormValidation = (formData: FormValue, validateOnLoad: boolean = false) => {
  const fields = reactive<Record<string, ReturnType<typeof useFieldValidation>>>({});
  const updateDataHandler = (data: FormValue, validate: boolean = false) => {
    Object.entries(data).forEach(([fieldName, fieldData]) => {
      fields[fieldName] = useFieldValidation({ inputValue: fieldData.value, rules: fieldData.rules });
      if (validate) fields[fieldName].validate();
    });
  };
  updateDataHandler(formData, validateOnLoad);
  watch(formData, (formData) => updateDataHandler(formData, true));
  return {
    fields,
  };
};
