<script setup lang="ts">
import { NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, inject, ref } from 'vue';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
} from '@/components';
import type { INmorphSelectButtonItemProps } from './types';

const selectedValue = inject<NmorphSelectButtonSelectedValueInjectionType | undefined>(
  'select-button-selected-value',
  undefined
);
const changeHandler = inject<NmorphSelectButtonChangeHandlerInjectionType | undefined>(
  'select-button-change-handler',
  undefined
);

const props = withDefaults(defineProps<INmorphSelectButtonItemProps>(), {
  disabled: false,
  tabindex: 0,
});

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const checked = computed(() => selectedValue?.value === props.value);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-select-button-item': [checked.value && 'checked', props.disabled && 'disabled'],
  })
);

const clickHandler = () => {
  if (props.disabled) return;
  if (changeHandler) changeHandler(props.value);
};
</script>

<template>
  <label
    :class="modifiers"
    :tabindex="props.tabindex"
    @click.prevent="clickHandler"
    @keydown.space.prevent="clickHandler"
    @keydown.enter.prevent="clickHandler"
  >
    <input
      ref="inputDOMRef"
      type="radio"
      :value="props.value"
      :checked="checked"
      :disabled="props.disabled"
      tabindex="-1"
      class="nmorph-native-input"
    />
    <span class="nmorph-select-button-item__content">
      <slot />
    </span>
  </label>
</template>

<style lang="scss">
.nmorph-select-button-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--nmorph-private-select-button-item-height);
  padding: 0 var(--indentation-04);
  font-size: var(--nmorph-private-control-font-size);
  line-height: var(--nmorph-private-control-line-height);
  border-radius: var(--default-border-radius);
  transform: translateY(0);
  cursor: pointer;
  opacity: 0.45;
  transition:
    opacity ease-in-out var(--transition-02),
    transform ease-in-out var(--transition-01);

  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid var(--nmorph-accent-color);
    outline-offset: 2px;
  }

  &:not(.nmorph-select-button-item--disabled):hover {
    opacity: 0.72;
  }

  &:not(.nmorph-select-button-item--disabled):active {
    transform: translateY(1px);
  }

  .nmorph-select-button-item__content {
    min-width: 0;
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  &.nmorph-select-button-item--checked {
    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    opacity: 1;
  }

  &.nmorph-select-button-item--checked:hover {
    opacity: 1;
  }

  &.nmorph-select-button-item--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
