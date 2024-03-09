<script setup lang="ts">
import { IRadioOption, RadioStyleType } from '../nmorph-radio/types';
import NmorphRadio from './../nmorph-radio/NmorphRadio.vue';
import { createModifiers } from './../../../../utils';
import { computed, provide, ref } from 'vue';
import { ComponentDirection } from 'src/components/common-component.enums';

interface IProps {
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
});

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const initialValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();
const changeHandler = (value: string) => {
  initialValue.value = value;
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() => createModifiers('nmorph-radio-group', [props.styleType, props.direction]));

provide('radio-group-selected-value', initialValue);
provide('change-radio-button-value-handler', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-radio-group__wrapper">
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
</template>

<style lang="scss">
.nmorph-radio-group {
  display: inline-block;
  .nmorph-radio-group__wrapper {
    display: flex;
    flex-direction: row;
  }
  .nmorph-radio {
    margin-right: 8px;
  }
}

.nmorph-radio-group--button-style {
  .nmorph-radio {
    margin-right: 0;
  }
}

.nmorph-radio-group--column {
  .nmorph-radio-group__wrapper {
    flex-direction: column;
  }
  .nmorph-radio {
    margin-right: 0;
    margin-bottom: 8px;
  }
}
</style>
