<script setup lang="ts">
import { NmorphCommonInputProps, NmorphComponentDirection } from '@/types/common';
import { useModifiers } from '@/utils';
import { ref, computed, provide, watch } from 'vue';
import { IRadioOption, RadioStyleType } from '../types';
import NmorphRadio from './../nmorph-radio/NmorphRadio.vue';

interface IProps extends NmorphCommonInputProps {
  modelValue: string;
  options?: IRadioOption[];
  styleType?: keyof typeof RadioStyleType;
  direction?: keyof typeof NmorphComponentDirection;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  styleType: 'button-style',
  options: () => [],
  direction: 'row',
  label: '',
  disabled: false,
});

interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const initialValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    initialValue.value = newValue;
  }
);

const emit = defineEmits<IEmit>();
const changeHandler = (value: string) => {
  initialValue.value = value;
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() =>
  useModifiers({ 'nmorph-radio-group': [props.styleType, props.direction, `${props.fill && 'fill'}`] })
);

provide('radio-group-selected-value', initialValue);
provide('change-radio-button-value-handler', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-radio-group__wrapper">
      <div class="nmorph-radio-group__content">
        <NmorphRadio
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled || props.disabled"
          :style-type="props.styleType"
        />
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-radio-group {
  display: inline-block;

  .nmorph-radio-group__wrapper {
    display: flex;
    align-items: center;
  }

  .nmorph-radio-group__content {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

  .nmorph-radio:not(:last-child) {
    margin-right: var(--indentation-03);
    margin-bottom: var(--indentation-03);
  }
}
.nmorph-radio-group--fill {
  width: 100%;
}
.nmorph-radio-group--column {
  .nmorph-radio-group__content {
    flex-direction: column;
  }

  .nmorph-radio:not(:last-child) {
    margin-right: var(--indentation-00);
    margin-bottom: var(--indentation-03);
  }
}
</style>
