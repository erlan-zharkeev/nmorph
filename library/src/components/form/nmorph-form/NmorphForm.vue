<script setup lang="ts">
import { createModifiers } from '@/utils';
import { computed, provide } from 'vue';
import { useFormValidation } from '@/hooks';
import { FormValue } from '../types';

interface IProps {
  value: FormValue;
}

const props = withDefaults(defineProps<IProps>(), {});

const modifiers = computed(() => createModifiers('nmorph-form', []));
const formValidationData = useFormValidation(props.value);
provide('form-data', formValidationData);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-form__content">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-form {
  --width: var(--max-width-container);
  max-width: var(--width);
}
</style>
