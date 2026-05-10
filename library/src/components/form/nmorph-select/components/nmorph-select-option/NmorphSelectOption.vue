<script setup lang="ts">
import { NmorphComponentHeight } from '@/types';
import { useModifiers } from '@/utils';
import { inject, computed } from 'vue';
import {
  INmorphSelectOption,
  NmorphIcon,
  NmorphIconSuccess,
  NmorphSelectChangeSelectedValue,
  NmorphSelectSelectedValueInjectionType,
} from '@/components';

const selectSelectedValue = inject<NmorphSelectSelectedValueInjectionType>('select-selected-value');
const selectChangeSelectedValue = inject<NmorphSelectChangeSelectedValue>('select-change-selected-value');

const props = withDefaults(defineProps<INmorphSelectOption>(), {
  label: '',
  height: 'basic',
  disabled: false,
  focused: false,
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
      `${props.focused && 'focused'}`,
    ],
  })
);
</script>

<template>
  <div :class="modifiers" :value="props.value" @click="clickHandler">
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
  --hover-bg: var(--nmorph-accent-color);
  --hover-color: var(--nmorph-white-color);

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
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
