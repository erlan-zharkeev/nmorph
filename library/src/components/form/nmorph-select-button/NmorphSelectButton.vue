<script setup lang="ts">
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import { computed, ref, watch, provide } from 'vue';
import type { CSSProperties } from 'vue';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
  NmorphSelectButtonItem,
} from '@/components';
import { useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphSelectButtonEmit, INmorphSelectButtonProps } from './types';

const props = withDefaults(defineProps<INmorphSelectButtonProps>(), {
  modelValue: '',
  height: 'basic',
  disabled: false,
  options: () => [],
  fill: false,
  trackPadding: undefined,
  itemSize: undefined,
  itemFontSize: undefined,
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
    'nmorph-select-button': [props.disabled && 'disabled', props.fill && 'fill', props.height],
  })
);

const styles = computed<CSSProperties>(() => ({
  ...createCssSizeVariables({
    '--track-padding': props.trackPadding,
    '--item-size': props.itemSize,
  }),
  ...createCssVariables({
    '--item-font-size': props.itemFontSize,
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
  --track-padding: 4px;
  --item-size: calc(var(--default-thickness-component) - var(--track-padding) * 2);
  --item-font-size: var(--font-size-small);

  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: var(--track-padding);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);

  &.nmorph-select-button--thin {
    --item-size: calc(var(--thin-component) - var(--track-padding) * 2);
    --item-font-size: var(--font-size-extra-small);
  }

  &.nmorph-select-button--thick {
    --item-size: calc(var(--thick-component) - var(--track-padding) * 2);
    --item-font-size: var(--font-size-base);
  }

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
