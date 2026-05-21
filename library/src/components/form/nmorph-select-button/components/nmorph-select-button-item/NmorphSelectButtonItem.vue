<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, inject, ref } from 'vue';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
} from '@/components';

const selectedValue = inject<NmorphSelectButtonSelectedValueInjectionType | undefined>(
  'select-button-selected-value',
  undefined
);
const changeHandler = inject<NmorphSelectButtonChangeHandlerInjectionType | undefined>(
  'select-button-change-handler',
  undefined
);

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  value: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
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
    <slot />
  </label>
</template>

<style lang="scss">
.nmorph-select-button-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: var(--item-size);
  padding: 0 var(--indentation-04);
  font-size: var(--item-font-size);
  border-radius: var(--default-border-radius);
  cursor: pointer;
  opacity: 0.45;

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

  &.nmorph-select-button-item--checked {
    background: var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    opacity: 1;
  }

  &.nmorph-select-button-item--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style>
