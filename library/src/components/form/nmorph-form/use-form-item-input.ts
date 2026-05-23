import { computed, getCurrentInstance, inject, useId } from 'vue';
import type { INmorphCommonInputProps } from '@/types';
import type { NmorphAvailableFormValueType, NmorphFormItemInputDataType } from './types';

export const nmorphFormItemInputDataKey = 'nmorph-form-item-input-data';

export const useFormItemInput = (props: Pick<INmorphCommonInputProps, 'id' | 'name' | 'tabindex' | 'autocomplete'>) => {
  const formItemInputData = inject<NmorphFormItemInputDataType | undefined>(nmorphFormItemInputDataKey, undefined);
  const fallbackId = `nmorph-${useId()}`;

  const id = computed(() => props.id || formItemInputData?.id.value || fallbackId);
  const name = computed(() => props.name || formItemInputData?.name.value || id.value);
  const autocomplete = computed(() => props.autocomplete || formItemInputData?.autocomplete.value || undefined);
  const tabindex = computed(() => props.tabindex ?? 0);

  return {
    id,
    name,
    autocomplete,
    tabindex,
  };
};

const hasOwn = (value: Record<string, unknown>, key: string) => Object.prototype.hasOwnProperty.call(value, key);

export const useFormItemModel = <T extends NmorphAvailableFormValueType>(
  props: { modelValue?: T },
  emitUpdate: (value: T) => void,
  fallbackValue: T
) => {
  const formItemInputData = inject<NmorphFormItemInputDataType | undefined>(nmorphFormItemInputDataKey, undefined);
  const instance = getCurrentInstance();

  const modelValueIsControlled = computed(() => {
    const vnodeProps = instance?.vnode.props || {};
    return hasOwn(vnodeProps, 'modelValue') || hasOwn(vnodeProps, 'model-value');
  });

  const modelValue = computed<T>(() => {
    if (modelValueIsControlled.value) return props.modelValue !== undefined ? props.modelValue : fallbackValue;

    const formValue = formItemInputData?.value.value;
    if (formValue !== undefined) return formValue as T;

    return props.modelValue !== undefined ? props.modelValue : fallbackValue;
  });

  const updateModelValue = (value: T) => {
    if (!modelValueIsControlled.value) {
      formItemInputData?.updateValue(value);
    }

    emitUpdate(value);
  };

  const validateModelValue = (value: T = modelValue.value) => {
    formItemInputData?.validate(value);
  };

  return {
    formItemInputData,
    modelValue,
    modelValueIsControlled,
    updateModelValue,
    validateModelValue,
  };
};
