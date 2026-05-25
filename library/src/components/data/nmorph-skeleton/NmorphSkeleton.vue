<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssVariables, useModifiers } from '@/utils';
import { NmorphSkeletonItem } from '@/components';
import type { INmorphSkeletonProps } from './types';

const props = withDefaults(defineProps<INmorphSkeletonProps>(), {
  animated: true,
  loading: true,
  rows: 0,
  loadingGradient: undefined,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton': [props.animated && props.loading && 'loading'],
  })
);

const styles = computed<CSSProperties>(() =>
  createCssVariables({
    '--loading-gradient': props.loadingGradient,
  })
);
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div v-if="props.rows && props.loading" class="nmorph-skeleton__rows">
      <NmorphSkeletonItem v-for="row in props.rows" :key="row" width="100%" height="14px" variant="rect" />
    </div>
    <div v-show="!props.rows && props.loading" class="nmorph-skeleton__template">
      <slot name="template" />
    </div>
    <div v-show="!props.loading" class="nmorph-skeleton__default">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-skeleton {
  &.nmorph-skeleton--loading {
    --loading-gradient: linear-gradient(
      90deg,
      var(--nmorph-text-color) 25%,
      var(--nmorph-white-color) 37%,
      var(--nmorph-text-color) 63%
    );

    .nmorph-skeleton-item::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--loading-gradient);
      background-size: 400% 100%;
      opacity: 0.3;
      animation: nmorph-skeleton-loading-animation 2.4s ease infinite;
      content: '';
      pointer-events: none;
    }
  }
}
</style>
