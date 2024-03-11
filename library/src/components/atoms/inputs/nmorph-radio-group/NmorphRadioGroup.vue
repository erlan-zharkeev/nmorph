<script setup lang="ts">
import { IRadioOption, RadioStyleType } from '../nmorph-radio/types';
import NmorphRadio from './../nmorph-radio/NmorphRadio.vue';
import { createModifiers } from './../../../../utils';
import { computed, provide, ref } from 'vue';
import { CommonInputProps, ComponentDirection } from 'src/components/common-component.enums';
import NmorphErrorBox from './../nmorph-error-box/NmorphErrorBox.vue';
import { useValidation, IRadioGroupValidationRule } from './../../../../hooks/useValidation';
import NmorphValidationIcon from './../common/NmorphValidationIcon.vue';

interface IProps extends CommonInputProps {
  modelValue: string;
  options: IRadioOption[];
  styleType?: keyof typeof RadioStyleType;
  direction?: keyof typeof ComponentDirection;
  rules?: IRadioGroupValidationRule[];
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  styleType: 'radio-style',
  options: () => [],
  direction: 'row',
  rules: () => [],
  showValidationIcon: true,
  staticErrorBoxSpace: false,
  fill: true,
  label: '',
});

export interface IEmit {
  (e: 'update:modelValue', val: string): void;
}

const inputValue = ref(props.modelValue);

const emit = defineEmits<IEmit>();
const changeHandler = (value: string) => {
  inputValue.value = value;
  emit('update:modelValue', inputValue.value);
};

const modifiers = computed(() =>
  createModifiers('nmorph-radio-group', [
    props.styleType,
    props.direction,
    props.fill ? 'fill' : '',
    props.label ? 'labeled' : '',
  ])
);

provide('radio-group-selected-value', inputValue);
provide('change-radio-button-value-handler', changeHandler);

const { showValidation, errors, valid } = useValidation({
  rules: props.rules,
  inputValue,
});
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
      <NmorphValidationIcon :valid="valid" :show="showValidation" />
    </div>
    <NmorphErrorBox v-if="props.staticErrorBoxSpace || showValidation" :errors="errors" />
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
  .nmorph-error-box__error {
    margin-left: 0;
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
