<script setup lang="ts">
import {
  INmorphCommonInputProps,
  INmorphRadioOption,
  NmorphComponentDirection,
  NmorphRadioChangeRadioButtonValueHandlerInjectionType,
  NmorphRadioGroupSelectedValueInjectionType,
  NmorphRadioStyleType,
  NmorphSelectionControlHeightType,
} from '@/types';
import { useModifiers } from '@/utils';
import { ref, computed, provide, watch } from 'vue';
import { NmorphRadio } from '@/components';
import { useFormItemModel } from '../nmorph-form/use-form-item-input';

type NmorphListRadioOptionElementType = Omit<INmorphRadioOption, 'checked'>;

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: string;
  options?: NmorphListRadioOptionElementType[];
  styleType?: keyof typeof NmorphRadioStyleType;
  direction?: keyof typeof NmorphComponentDirection;
  height?: NmorphSelectionControlHeightType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  styleType: 'button',
  options: () => [],
  direction: 'row',
  label: '',
  disabled: false,
  height: 'thin',
});

interface INmorphEmit {
  (e: 'update:model-value', val: string): void;
}

const emit = defineEmits<INmorphEmit>();
const { modelValue, updateModelValue } = useFormItemModel<string>(
  props,
  (value) => emit('update:model-value', value),
  ''
);
const initialValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
  initialValue.value = newValue;
});

const changeHandler = (value: string) => {
  initialValue.value = value;
  updateModelValue(initialValue.value);
};

const modifiers = computed(() => useModifiers({ 'nmorph-radio-group': [props.styleType, props.direction] }));
const height = computed(() => props.height);

provide<NmorphRadioGroupSelectedValueInjectionType>('radio-group-selected-value', initialValue);
provide<NmorphRadioChangeRadioButtonValueHandlerInjectionType>('change-radio-button-value-handler', changeHandler);
provide('radio-group-height', height);
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
          :tabindex="option.tabindex"
          :height="option.height || props.height"
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
  }

  &.nmorph-radio-group--column {
    .nmorph-radio-group__content {
      flex-direction: column;
      align-items: flex-start;
    }

    .nmorph-radio:not(:last-child) {
      margin-right: var(--indentation-00);
      margin-bottom: var(--indentation-03);
    }
  }
}
</style>
