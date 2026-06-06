<script setup lang="ts">
import { NmorphComponentThickness } from '@/types';
import { createCssVariables, useModifiers } from '@/utils';
import { inject, computed, type Ref } from 'vue';
import type { CSSProperties } from 'vue';
import {
  INmorphSelectOption,
  NmorphIcon,
  NmorphIconSuccess,
  NmorphSelectChangeSelectedValue,
  NmorphSelectSelectedValueInjectionType,
} from '@/components';
import type { INmorphSelectOptionEmit } from './types';

const selectSelectedValue = inject<NmorphSelectSelectedValueInjectionType>('select-selected-value');
const selectChangeSelectedValue = inject<NmorphSelectChangeSelectedValue>('select-change-selected-value');
const selectThickness = inject<Ref<keyof typeof NmorphComponentThickness | undefined> | undefined>(
  'select-thickness',
  undefined
);

const props = withDefaults(defineProps<INmorphSelectOption>(), {
  label: '',
  disabled: false,
  focused: false,
  hoverBackground: undefined,
  hoverColor: undefined,
});

const emit = defineEmits<INmorphSelectOptionEmit>();

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

const thickness = computed(() => props.thickness || selectThickness?.value || 'basic');

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentThickness[thickness.value]],
    'nmorph-select-option': [
      props.disabled && 'disabled',
      props.label && 'with-label',
      checked.value && 'checked',
      props.focused && 'focused',
    ],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssVariables({
    '--nmorph-private-select-option-hover-background': props.hoverBackground,
    '--nmorph-private-select-option-hover-color': props.hoverColor,
  })
);
</script>

<template>
  <div
    :class="modifiers"
    :style="styles"
    :value="props.value"
    role="option"
    :aria-selected="checked"
    :aria-disabled="props.disabled"
    @click="clickHandler"
  >
    <div class="nmorph-select-option__content">
      <span>{{ props.label }}</span>
      <slot />
    </div>
    <NmorphIcon v-if="checked" class="nmorph-select-option__checked">
      <NmorphIconSuccess />
    </NmorphIcon>
  </div>
</template>

<style lang="scss">
.nmorph-select-option {
  --nmorph-private-select-option-hover-background: var(--nmorph-accent-color);
  --nmorph-private-select-option-hover-color: var(--nmorph-white-color);

  display: flex;
  gap: var(--indentation-01);
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  padding: var(--indentation-00) var(--default-indentation-input);
  cursor: pointer;

  .nmorph-select-option__content {
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transform: translateY(var(--nmorph-private-control-text-offset-y));
  }

  .nmorph-select-option__content span {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-select-option__checked {
    flex: 0 0 auto;
  }

  &:not(.nmorph-select-option--disabled):hover {
    background: var(--nmorph-private-select-option-hover-background);
  }

  &:not(.nmorph-select-option--disabled):hover span {
    color: var(--nmorph-private-select-option-hover-color);
  }

  &:not(.nmorph-select-option--disabled):hover .nmorph-select-option__checked {
    --nmorph-private-icon-color: var(--nmorph-private-select-option-hover-color);
  }

  &.nmorph-select-option--focused {
    &:not(.nmorph-select-option--disabled) {
      background: var(--nmorph-private-select-option-hover-background);
    }

    &:not(.nmorph-select-option--disabled) span {
      color: var(--nmorph-private-select-option-hover-color);
    }

    &:not(.nmorph-select-option--disabled) .nmorph-select-option__checked {
      --nmorph-private-icon-color: var(--nmorph-private-select-option-hover-color);
    }
  }

  &.nmorph-select-option--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
