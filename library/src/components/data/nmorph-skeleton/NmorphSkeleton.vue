<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphSkeletonItem } from '@/components';

interface INmorphProps {
  animated?: boolean;
  loading?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  animated: true,
  loading: true,
  rows: 0,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton': [`${props.animated && props.loading && 'loading'}`],
  })
);
</script>

<template>
  <div :class="modifiers">
    <div v-if="props.rows && props.loading" class="nmorph-skeleton__rows">
      <NmorphSkeletonItem v-for="row in props.rows" :key="row" width="100%" height="14px" />
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
.nmorph-skeleton--loading {
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

@keyframes nmorph-skeleton-loading-animation {
  0% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>
