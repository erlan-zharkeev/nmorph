import { computed, inject } from 'vue';
import { INmorphCommonInputProps } from '@/types';
import { generateUUID } from '@/utils';
import { NmorphFormItemInputDataType } from './types';

export const nmorphFormItemInputDataKey = 'nmorph-form-item-input-data';

export const useFormItemInput = (props: Pick<INmorphCommonInputProps, 'id' | 'name' | 'tabindex'>) => {
  const formItemInputData = inject<NmorphFormItemInputDataType>(nmorphFormItemInputDataKey);
  const fallbackId = generateUUID();

  const id = computed(() => props.id || formItemInputData?.id.value || fallbackId);
  const name = computed(() => props.name || formItemInputData?.name.value || id.value);
  const tabindex = computed(() => props.tabindex ?? 0);

  return {
    id,
    name,
    tabindex,
  };
};
