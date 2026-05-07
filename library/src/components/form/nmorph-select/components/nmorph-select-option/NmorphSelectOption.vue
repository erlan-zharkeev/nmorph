<script setup lang="ts">
import { NmorphComponentHeight } from '@/types';
import { disabled, useModifiers } from '@/utils';
import { inject, computed } from 'vue';
import {
  INmorphSelectOption,
  NmorphIcon,
  NmorphIconSuccess,
  NmorphSelectChangeSelectedValue,
  NmorphSelectSelectedValueInjectionType,
} from '@/components';
import { styled, css } from '@vue-styled-components/core'

const selectSelectedValue = inject<NmorphSelectSelectedValueInjectionType>('select-selected-value');
const selectChangeSelectedValue = inject<NmorphSelectChangeSelectedValue>('select-change-selected-value');

const props = withDefaults(defineProps<INmorphSelectOption>(), {
  label: '',
  height: 'default',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'change-value', val: string): void;
}>();

const clickHandler = () => {
  if (props.disabled) return;
  emit('change-value', props.value);
  if (!selectChangeSelectedValue) return;
  selectChangeSelectedValue(props.value);
};

const checked = computed(() => {
  if (typeof selectSelectedValue?.value === 'string') {
    return selectSelectedValue.value === props.value;
  }
  if (Array.isArray(selectSelectedValue?.value)) {
    return selectSelectedValue.value.some((val) => val === props.value);
  }
  return false;
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
    'nmorph-select-option': [
      `${props.disabled && 'disabled'}`,
      `${props.label && 'with-label'}`,
      `${checked.value && 'checked'}`,
    ],
  })
);

const commonCSS = css`
  --hover-bg: var(--nmorph-accent-color);
  --hover-color: var(--nmorph-white-color);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--indentation-01);
  box-sizing: border-box;
  min-width: 0;
  padding: var(--indentation-00) var(--default-indentation-input);
  cursor: pointer;

  .nmorph-select-option__content {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nmorph-select-option__content span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nmorph-select-option__checked {
    flex: 0 0 auto;
  }

  &:not(.nmorph-select-option--disabled):hover {
    background: var(--hover-bg);
  }

  &:not(.nmorph-select-option--disabled):hover span {
    color: var(--hover-color);
  }

  &:not(.nmorph-select-option--disabled):hover .nmorph-select-option__checked {
    --color: var(--hover-color);
  }

  &.nmorph-select-option--focused {
    &:not(.nmorph-select-option--disabled) {
      background: var(--hover-bg);
    }

    &:not(.nmorph-select-option--disabled) span {
      color: var(--hover-color);
    }

    &:not(.nmorph-select-option--disabled) .nmorph-select-option__checked {
      --color: var(--hover-color);
    }
  }

  &.nmorph-select-option--disabled {
    ${disabled()}

    pointer-events: none;
  }

`

const StyledComponent = styled.div`
  ${commonCSS}
`
</script>

<template>
  <StyledComponent :class="modifiers" @click="clickHandler" :value="props.value">
    <div class="nmorph-select-option__content">
      <span>{{ props.label }}</span>
      <slot />
    </div>
    <NmorphIcon v-if="checked" class="nmorph-select-option__checked">
      <NmorphIconSuccess />
    </NmorphIcon>
  </StyledComponent>
</template>
