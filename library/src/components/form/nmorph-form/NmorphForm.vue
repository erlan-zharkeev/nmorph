<script setup lang="ts">
import { getModifiers } from '@/utils';
import { computed, provide } from 'vue';
import { useFormValidation } from '@/hooks';
import { FormValue } from '../types';
import { onMounted } from 'vue';

interface IProps {
  value: FormValue;
  validateImmediately?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  validateImmediately: false,
});

const modifiers = computed(() =>
  getModifiers({
    'nmorph-form': [],
  })
);
const formValidationData = useFormValidation(props.value, props.validateImmediately);

interface IEmit {
  (e: 'formValidator', val: ReturnType<typeof useFormValidation>): void;
}

const emit = defineEmits<IEmit>();
onMounted(() => {
  emit('formValidator', formValidationData);
});
provide('form-data', formValidationData);
</script>

<template>
  <form :class="modifiers">
    <div class="nmorph-form__content">
      <slot name="default" />
    </div>
  </form>
</template>
