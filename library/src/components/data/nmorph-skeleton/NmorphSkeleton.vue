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
      <NmorphSkeletonItem v-for="row in props.rows" :key="row" />
    </div>
    <div v-else-if="props.loading" class="nmorph-skeleton__template">
      <slot name="template" />
    </div>
    <div v-else class="nmorph-skeleton__default">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-skeleton {
  .nmorph-skeleton__template {
    .nmorph-skeleton-item:first-child:not(.nmorph-skeleton-item--image),
    .nmorph-skeleton-item:first-child:not(.nmorph-skeleton-item--circle) {
      width: 33%;
    }

    .nmorph-skeleton-item:last-child:not(.nmorph-skeleton-item--image),
    .nmorph-skeleton-item:last-child:not(.nmorph-skeleton-item--circle) {
      width: 63%;
    }
  }
}

.nmorph-skeleton--loading {
  .nmorph-skeleton-item {
    background: linear-gradient(
      90deg,
      var(--nmorph-gray-color) 25%,
      var(--info-color-01) 37%,
      var(--nmorph-gray-color) 63%
    );
    background-size: 400% 100%;
    animation: nmorph-skeleton-loading-animation 1.4s ease infinite;
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
