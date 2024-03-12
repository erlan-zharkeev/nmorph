<script setup lang="ts">
import { createModifiers } from './../../../../utils';
import { computed, provide, ref } from 'vue';
import { ICheckboxOption, ICheckboxStyleType } from './../nmorph-checkbox/types';
import NmorphCheckbox from '../nmorph-checkbox/NmorphCheckbox.vue';
import { CommonInputProps, ComponentDirection } from './../../../common-component.enums';
import NmorphErrorBox from './../../nmorph-error-box/NmorphErrorBox.vue';
import { useValidation, ICheckboxGroupValidationRule } from './../../../../hooks/useValidation';
import NmorphValidationIcon from './../common/NmorphValidationIcon.vue';

interface IProps extends CommonInputProps {
  modelValue: string[];
  options: ICheckboxOption[];
  styleType?: keyof typeof ICheckboxStyleType;
  direction?: keyof typeof ComponentDirection;
  rules?: ICheckboxGroupValidationRule[];
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => [],
  options: () => [],
  styleType: 'checkbox-style',
  direction: 'row',
  rules: () => [],
  showValidationIcon: true,
  staticErrorBoxSpace: false,
  fill: true,
  label: '',
});

export interface IEmit {
  (e: 'update:modelValue', val: string[]): void;
}

const inputValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();

const changeHandler = (id: string) => {
  if (inputValue.value.includes(id)) {
    inputValue.value = inputValue.value.filter((checkboxId) => checkboxId !== id);
  } else inputValue.value.push(id);
  emit('update:modelValue', inputValue.value);
};

const modifiers = computed(() =>
  createModifiers('nmorph-checkbox-group', [
    props.styleType,
    props.direction,
    props.fill ? 'fill' : '',
    props.label ? 'labeled' : '',
  ])
);

provide('checkbox-group-selected-value', inputValue);
provide('change-checkbox-value-handler', changeHandler);

const { showValidation, errors, valid } = useValidation({
  rules: props.rules,
  inputValue,
});
</script>

<template>
  <div :class="modifiers">
    <legend v-if="props.label">{{ props.label }}</legend>
    <div class="nmorph-checkbox-group__wrapper">
      <div class="nmorph-checkbox-group__content">
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
      <NmorphValidationIcon :valid="valid" :show="showValidation" />
    </div>
    <NmorphErrorBox v-if="props.staticErrorBoxSpace || showValidation" :errors="errors" />
  </div>
</template>

<style lang="scss">
.nmorph-checkbox-group {
  display: inline-block;

  .nmorph-checkbox-group__wrapper {
    display: flex;
    align-items: center;
  }

  .nmorph-checkbox-group__content {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .nmorph-checkbox {
    margin-right: 8px;
  }
  .nmorph-error-box__error {
    margin-left: 0;
  }
}

.nmorph-checkbox-group--column {
  .nmorph-checkbox-group__content {
    flex-direction: column;
  }
  .nmorph-checkbox {
    margin-right: 0;
    margin-bottom: 8px;
  }
}

.nmorph-checkbox-group--fill {
  width: 100%;
}

.nmorph-checkbox-group--labeled {
  .nmorph-checkbox-group__content {
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
