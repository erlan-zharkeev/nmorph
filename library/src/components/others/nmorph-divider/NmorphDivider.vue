<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphDirectionType } from '@/components';

interface INmorphProps {
  direction?: NmorphDirectionType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
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
  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);

  &.nmorph-divider--horizontal {
    width: 100%;
    height: 2px;
  }

  &.nmorph-divider--vertical {
    width: 2px;
    height: auto;
  }
}
</style>
