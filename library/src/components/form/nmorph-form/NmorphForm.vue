<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed, provide } from 'vue';
import { useFormValidation } from '@/hooks';
import { onMounted } from 'vue';
import { NmorphFormValueType, NmorphFormValidationDataType } from './types';

interface INmorphProps {
  value: NmorphFormValueType;
  validateImmediately?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  validateImmediately: false,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-form': [],
  })
);
const formValidationData = useFormValidation(props.value, props.validateImmediately);

interface INmorphEmit {
  (e: 'form-validator', val: ReturnType<typeof useFormValidation>): void;
}

const emit = defineEmits<INmorphEmit>();
onMounted(() => {
  emit('form-validator', formValidationData);
});
provide<NmorphFormValidationDataType>('form-data', formValidationData);
</script>

<template>
  <form :class="modifiers">
    <div class="nmorph-form__content">
      <slot />
    </div>
  </form>
</template>
