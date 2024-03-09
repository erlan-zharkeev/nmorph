<script setup lang="ts">
import { createModifiers } from './../../../../utils';
import { computed, provide, ref } from 'vue';
import { ICheckboxOption, ICheckboxStyleType } from './../nmorph-checkbox/types';
import NmorphCheckbox from '../nmorph-checkbox/NmorphCheckbox.vue';
import { ComponentDirection } from './../../../common-component.enums';

interface IProps {
  modelValue: string[];
  options: ICheckboxOption[];
  styleType?: keyof typeof ICheckboxStyleType;
  direction?: keyof typeof ComponentDirection;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  options: () => [],
  styleType: 'checkbox-style',
  direction: 'row',
});

export interface IEmit {
  (e: 'update:modelValue', val: string[]): void;
}

const initialValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();

const changeHandler = (id: string) => {
  if (initialValue.value.includes(id)) {
    initialValue.value = initialValue.value.filter((checkboxId) => checkboxId !== id);
  } else initialValue.value.push(id);
  emit('update:modelValue', initialValue.value);
};

const modifiers = computed(() => createModifiers('nmorph-checkbox-group', [props.styleType, props.direction]));

provide('checkbox-group-selected-value', initialValue);
provide('change-checkbox-value-handler', changeHandler);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-checkbox-group__wrapper">
      <NmorphCheckbox
        v-for="(option, idx) in options"
        :id="option.id"
        :key="idx"
        :label="option.label"
        :model-value="option.modelValue"
        :disabled="option.disabled"
        :style-type="props.styleType"
      />
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-checkbox-group {
  display: inline-block;
  .nmorph-checkbox-group__wrapper {
    display: flex;
    flex-direction: row;
  }
  .nmorph-checkbox {
    margin-right: 8px;
  }
}

.nmorph-checkbox-group--button-style {
  .nmorph-checkbox {
    margin-right: 0;
  }
}

.nmorph-checkbox-group--column {
  .nmorph-checkbox-group__wrapper {
    flex-direction: column;
  }
  .nmorph-checkbox {
    margin-right: 0;
    margin-bottom: 8px;
  }
}
</style>
