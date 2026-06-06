<script setup lang="ts">
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import { computed, ref, watch, provide } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphComponentThickness } from '@/types';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
  NmorphSelectButtonItem,
} from '@/components';
import { useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphSelectButtonEmit, INmorphSelectButtonProps } from './types';

const props = withDefaults(defineProps<INmorphSelectButtonProps>(), {
  modelValue: '',
  thickness: 'basic',
  disabled: false,
  options: () => [],
  fill: false,
  trackPadding: undefined,
  itemSize: undefined,
  itemFontSize: undefined,
  itemLineHeight: undefined,
});

const emit = defineEmits<INmorphSelectButtonEmit>();

const { modelValue, updateModelValue } = useFormItemModel<string>(
  props,
  (value) => emit('update:model-value', value),
  ''
);
const initialValue = ref(modelValue.value);

watch(modelValue, (newValue) => {
  initialValue.value = newValue;
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[props.thickness]],
    'nmorph-select-button': [props.disabled && 'disabled', props.fill && 'fill', props.thickness],
  })
);

const styles = computed<CSSProperties>(() => ({
  ...createCssSizeVariables({
    '--nmorph-private-select-button-track-padding': props.trackPadding,
    '--nmorph-private-select-button-item-size': props.itemSize,
  }),
  ...createCssVariables({
    '--nmorph-private-select-button-item-font-size': props.itemFontSize,
    '--nmorph-private-select-button-item-line-height': props.itemLineHeight,
  }),
}));

const changeHandler = (value: string) => {
  if (props.disabled) return;
  initialValue.value = value;
  updateModelValue(value);
};

provide<NmorphSelectButtonSelectedValueInjectionType>('select-button-selected-value', initialValue);
provide<NmorphSelectButtonChangeHandlerInjectionType>('select-button-change-handler', changeHandler);
</script>

<template>
  <div :class="modifiers" :style="styles">
    <NmorphSelectButtonItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </NmorphSelectButtonItem>
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-select-button {
  --nmorph-private-select-button-track-padding: 4px;
  --nmorph-private-select-button-item-size: calc(
    var(--nmorph-private-control-height) - var(--nmorph-private-select-button-track-padding) * 2
  );
  --nmorph-private-select-button-item-font-size: var(--nmorph-private-control-font-size);
  --nmorph-private-select-button-item-line-height: var(--nmorph-private-control-line-height);

  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: var(--nmorph-private-select-button-track-padding);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
  transition:
    background-color ease-in-out var(--transition-02),
    border-color ease-in-out var(--transition-02),
    box-shadow ease-in-out var(--transition-02);

  &.nmorph-select-button--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.nmorph-select-button--fill {
    width: 100%;

    > .nmorph-select-button-item {
      flex: 1 1 0;
      min-width: 0;
    }
  }
}
</style>
