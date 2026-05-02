<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { disabled, nmorphOutset, useModifiers } from '@/utils';
import { computed, inject, ref } from 'vue';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
} from '@/components';
import { styled, css } from '@vue-styled-components/core';

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
});

const inputDOMRef = ref<NmorphDomElementType>(null);
defineExpose({ inputDOMRef });

const checked = computed(() => selectedValue?.value === props.value);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-select-button-item': [`${checked.value && 'checked'}`, `${props.disabled && 'disabled'}`],
  })
);

const clickHandler = () => {
  if (props.disabled) return;
  if (changeHandler) changeHandler(props.value);
};

const commonCSS = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--item-size);
  padding: 0 var(--indentation-04);
  border-radius: var(--default-border-radius);
  cursor: pointer;
  transition:
    box-shadow var(--transition-02) ease,
    background var(--transition-02) ease;
  font-size: var(--item-font-size);

  input {
    display: none;
  }

  &.nmorph-select-button-item--checked {
    ${nmorphOutset()}
  }

  &.nmorph-select-button-item--disabled {
    ${disabled()}
  }
`;

const StyledComponent = styled.label`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers" @click.prevent="clickHandler">
    <input
      ref="inputDOMRef"
      type="radio"
      :value="props.value"
      :checked="checked"
      :disabled="props.disabled"
      class="nmorph-native-input"
    />
    <slot />
  </StyledComponent>
</template>
