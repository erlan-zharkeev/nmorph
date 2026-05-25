<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, provide } from 'vue';
import { useFormValidation } from '@/hooks/use-form-validation';
import { NmorphFormValidationDataType } from './types';
import { INmorphFromDataExpose } from '@/types';
import type { INmorphFormProps } from './types';

const props = withDefaults(defineProps<INmorphFormProps>(), {
  validateImmediately: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-form': [],
  })
);

const formValidationData = useFormValidation(props.value, props.validateImmediately);

defineExpose<INmorphFromDataExpose>({ formData: formValidationData });
provide<NmorphFormValidationDataType>('form-data', formValidationData);
</script>

<template>
  <form :class="modifiers">
    <div class="nmorph-form__content">
      <slot />
    </div>
  </form>
</template>
