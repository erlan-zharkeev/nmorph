<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import type { INmorphDividerProps } from './types';

const props = withDefaults(defineProps<INmorphDividerProps>(), {
  direction: 'horizontal',
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-divider': [props.direction, props.design],
  })
);
</script>

<template>
  <div :class="modifiers" />
</template>

<style lang="scss">
.nmorph-divider {
  background: var(--nmorph-main-color);

  &.nmorph-divider--nmorph {
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-divider--plain {
    background: var(--nmorph-plain-border-color);
  }

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
