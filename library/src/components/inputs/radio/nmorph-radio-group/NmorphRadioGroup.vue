<script setup lang="ts">
import { CommonInputProps, ComponentDirection } from '@/types/common.enums';
import { createModifiers } from '@/utils';
import { ref, computed, provide } from 'vue';
import { IRadioOption, RadioStyleType } from '../types';
import NmorphRadio from './../nmorph-radio/NmorphRadio.vue';

interface IProps extends CommonInputProps {
  modelValue: string;
  options: IRadioOption[];
  styleType?: keyof typeof RadioStyleType;
  direction?: keyof typeof ComponentDirection;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  styleType: 'radio-style',
  options: () => [],
  direction: 'row',
  fill: true,
  label: '',
});

interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const initialValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();
const changeHandler = (value: string) => {
  initialValue.value = value;
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() =>
  createModifiers('nmorph-radio-group', [
    props.styleType,
    props.direction,
    props.fill ? 'fill' : '',
    props.label ? 'labeled' : '',
  ])
);

provide('radio-group-selected-value', initialValue);
provide('change-radio-button-value-handler', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <legend v-if="props.label">{{ props.label }}</legend>
    <div class="nmorph-radio-group__wrapper">
      <div class="nmorph-radio-group__content">
        <NmorphRadio
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
          :disabled="option.disabled"
          :style-type="props.styleType"
        />
        <slot name="default" />
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
    flex-direction: row;
    width: 100%;
  }
  .nmorph-radio {
    margin-right: 8px;
  }
}

.nmorph-radio-group--column {
  .nmorph-radio-group__content {
    flex-direction: column;
  }
  .nmorph-radio {
    margin-right: 0;
    margin-bottom: 8px;
  }
}

.nmorph-radio-group--fill {
  width: 100%;
}

.nmorph-radio-group--labeled {
  .nmorph-radio-group__content {
    margin-top: 4px;
  }
  .nmorph-validation-icon {
    margin-top: 4px;
  }
  legend {
    @include body-1-strong(var(--text-01));
  }
}
</style>
