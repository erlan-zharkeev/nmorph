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
  tabindex: 0,
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
  opacity: 0.45;
  font-size: var(--item-font-size);

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
    opacity: 1;
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
  <StyledComponent
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
  </StyledComponent>
</template>
