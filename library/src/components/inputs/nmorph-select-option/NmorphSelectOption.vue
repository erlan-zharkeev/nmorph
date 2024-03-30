<script setup lang="ts">
import { CommonInputProps } from '@/types/common.enums';
import { getModifiers } from '@/utils';
import { inject, Ref, computed } from 'vue';
import { SelectModelValue } from './types';
import { NmorphIcon } from '@/components';

const selectSelectedValue = inject<Ref<SelectModelValue>>('select-selected-value');
const selectChangeSelectedValue = inject<(value: string) => void>('select-change-selected-value');

export interface ISelectOption extends Omit<CommonInputProps, 'fill'> {
  value: string;
  label: string;
}

const props = withDefaults(defineProps<ISelectOption>(), {
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
  getModifiers({
    'nmorph-select-option': [
      props.height,
      `${props.disabled && 'disabled'}`,
      `${props.label && 'with-label'}`,
      `${checked.value && 'checked'}`,
    ],
  })
);
</script>

<template>
  <div :class="modifiers" @click="clickHandler">
    <div class="nmorph-select-option__content">
      <span>{{ props.label }}</span>
      <slot name="default" />
    </div>
    <NmorphIcon v-if="checked" name="success" class="nmorph-select-option__checked" />
  </div>
</template>

<style lang="scss">
.nmorph-select-option {
  --height: var(--default-thickness-component);
  --hover-bg: var(--accent-color-01);
  --hover-color: var(--text-00);

  height: var(--height);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: var(--indentation-00) var(--indentation-03);

  &:not(.nmorph-select-option--disabled):hover {
    background: var(--hover-bg);
    color: var(--hover-color);
  }

  &:not(.nmorph-select-option--disabled):hover .nmorph-select-option__checked {
    --color: var(--hover-color);
  }
}

.nmorph-select-option--disabled {
  @include disabled;
  .nmorph-select-option__content {
    pointer-events: none;
  }
}

.nmorph-select-option--with-label {
  display: flex;
  align-items: center;
}
</style>
