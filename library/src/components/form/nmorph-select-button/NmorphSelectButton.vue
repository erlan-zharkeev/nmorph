<script setup lang="ts">
import { INmorphCommonInputProps } from '@/types';
import { disabled, nmorphInset, useModifiers } from '@/utils';
import { computed, ref, watch, provide } from 'vue';
import {
  NmorphSelectButtonChangeHandlerInjectionType,
  NmorphSelectButtonSelectedValueInjectionType,
  INmorphSelectButtonOption,
  NmorphSelectButtonItem,
} from '@/components';
import { styled, css } from '@vue-styled-components/core';

interface INmorphProps extends INmorphCommonInputProps {
  modelValue?: string;
  options?: INmorphSelectButtonOption[];
  fill?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: '',
  height: 'default',
  disabled: false,
  options: () => [],
  fill: false,
});

const emit = defineEmits<{
  (e: 'update:model-value', val: string): void;
}>();

const initialValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    initialValue.value = newValue;
  }
);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-select-button': [`${props.disabled && 'disabled'}`, `${props.fill && 'fill'}`, props.height],
  })
);

const changeHandler = (value: string) => {
  if (props.disabled) return;
  initialValue.value = value;
  emit('update:model-value', value);
};

provide<NmorphSelectButtonSelectedValueInjectionType>('select-button-selected-value', initialValue);
provide<NmorphSelectButtonChangeHandlerInjectionType>('select-button-change-handler', changeHandler);

const commonCSS = css`
  --track-padding: 4px;
  --item-size: calc(var(--default-thickness-component) - var(--track-padding) * 2);
  --item-font-size: var(--font-size-small);

  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: var(--track-padding);
  border-radius: var(--default-border-radius);
  ${nmorphInset()}

  &.nmorph-select-button--thin {
    --item-size: calc(var(--thin-component) - var(--track-padding) * 2);
    --item-font-size: var(--font-size-extra-small);
  }

  &.nmorph-select-button--thick {
    --item-size: calc(var(--thick-component) - var(--track-padding) * 2);
    --item-font-size: var(--font-size-base);
  }

  &.nmorph-select-button--disabled {
    ${disabled()}
  }

  &.nmorph-select-button--fill {
    width: 100%;

    > .nmorph-select-button-item {
      flex: 1 1 0;
      min-width: 0;
    }
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent :class="modifiers">
    <NmorphSelectButtonItem
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </NmorphSelectButtonItem>
    <slot />
  </StyledComponent>
</template>
