<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import type { INmorphDividerProps } from './types';

const props = withDefaults(defineProps<INmorphDividerProps>(), {
  direction: 'horizontal',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-divider': [props.direction],
  })
);
</script>

<template>
  <div :class="modifiers" />
</template>

<style lang="scss">
.nmorph-divider {
  background: color-mix(in srgb, var(--nmorph-text-color) 14%, var(--nmorph-main-color));
  border-radius: var(--border-radius-20);
  box-shadow: var(--nmorph-shadow-inset);

  &.nmorph-divider--horizontal {
    width: 100%;
    height: 2px;
  }

  &.nmorph-divider--vertical {
    align-self: stretch;
    width: 2px;
    height: auto;
  }
}
</style>
