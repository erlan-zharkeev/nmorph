<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import type { INmorphSortButtonEmit, INmorphSortButtonProps } from './types';

const props = withDefaults(defineProps<INmorphSortButtonProps>(), {});

const emit = defineEmits<INmorphSortButtonEmit>();
const modifiers = computed(() =>
  useModifiers({
    'nmorph-sort-button': [`${props.value}`],
  })
);

const toggleSort = () => {
  const value = props.value === 'ascending' ? 'descending' : 'ascending';
  emit('sort', value);
};

const nextSortLabel = computed(() => (props.value === 'ascending' ? 'Sort descending' : 'Sort ascending'));
</script>

<template>
  <div :class="modifiers">
    <button class="nmorph-sort-button__control" type="button" :aria-label="nextSortLabel" @click="toggleSort">
      <svg class="nmorph-sort-button__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path class="nmorph-sort-button__icon-up" d="M8 3 3.75 7.25h8.5L8 3Z" />
        <path class="nmorph-sort-button__icon-down" d="M8 13 12.25 8.75h-8.5L8 13Z" />
      </svg>
    </button>
  </div>
</template>

<style lang="scss">
.nmorph-sort-button {
  display: flex;
  align-items: center;

  .nmorph-sort-button__control {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: var(--thin-component);
    min-height: var(--thin-component);
    padding: 0;
    color: var(--nmorph-semi-contrast-text-color);
    background: transparent;
    border: none;
    border-radius: var(--default-border-radius);
    cursor: pointer;
    transition:
      color ease-in-out var(--transition-02),
      background-color ease-in-out var(--transition-02);
  }

  .nmorph-sort-button__control:hover {
    color: var(--nmorph-accent-color);
    background: color-mix(in srgb, var(--nmorph-accent-color) 12%, transparent);
  }

  .nmorph-sort-button__control:focus-visible {
    outline: 2px solid var(--nmorph-accent-color);
    outline-offset: 2px;
  }

  .nmorph-sort-button__icon {
    display: block;
    width: 16px;
    height: 16px;
    overflow: visible;
    fill: currentColor;
  }

  .nmorph-sort-button__icon-up,
  .nmorph-sort-button__icon-down {
    transition:
      fill ease-in-out var(--transition-02),
      opacity ease-in-out var(--transition-02);
    fill: var(--nmorph-semi-contrast-text-color);
  }

  .nmorph-sort-button__control:hover .nmorph-sort-button__icon-up,
  .nmorph-sort-button__control:hover .nmorph-sort-button__icon-down {
    fill: var(--nmorph-accent-color);
  }

  &.nmorph-sort-button--ascending {
    .nmorph-sort-button__icon-up {
      fill: var(--nmorph-accent-color);
    }
  }

  &.nmorph-sort-button--descending {
    .nmorph-sort-button__icon-down {
      fill: var(--nmorph-accent-color);
    }
  }
}
</style>
