import { computed, inject } from 'vue';
import { INmorphCommonInputProps } from '@/types';
import { generateUUID } from '@/utils';
import { NmorphFormItemInputDataType } from './types';

export const nmorphFormItemInputDataKey = 'nmorph-form-item-input-data';

export const useFormItemInput = (props: Pick<INmorphCommonInputProps, 'id' | 'name'>) => {
  const formItemInputData = inject<NmorphFormItemInputDataType | undefined>(nmorphFormItemInputDataKey, undefined);
  const fallbackId = generateUUID();

  const id = computed(() => props.id || formItemInputData?.id.value || fallbackId);
  const name = computed(() => props.name || formItemInputData?.name.value || id.value);

  return {
    id,
    name,
  };
};
