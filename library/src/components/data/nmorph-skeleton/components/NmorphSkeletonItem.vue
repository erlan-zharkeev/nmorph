<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphIconImage } from '@/components';
import type { INmorphSkeletonItemProps } from './types';

const props = withDefaults(defineProps<INmorphSkeletonItemProps>(), {
  variant: 'rect',
  width: 'auto',
  height: 'auto',
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton-item': [props.variant, props.design === 'nmorph' ? 'nmorph-design' : 'plain-design'],
  })
);

const cssWidth = computed(() => props.width);
const cssHeight = computed(() => props.height);
</script>

<template>
  <div
    :class="modifiers"
    :style="{ '--nmorph-private-skeleton-item-width': cssWidth, '--nmorph-private-skeleton-item-height': cssHeight }"
  >
    <div class="nmorph-skeleton-item__element">
      <NmorphIcon v-if="props.variant === 'image'" :width="props.width" :height="props.height">
        <NmorphIconImage />
      </NmorphIcon>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-skeleton-item {
  position: relative;
  width: var(--nmorph-private-skeleton-item-width);
  height: var(--nmorph-private-skeleton-item-height);
  margin-bottom: var(--indentation-02);
  overflow: hidden;
  background: var(--nmorph-text-color);

  &.nmorph-skeleton-item--image {
    background: none;

    .nmorph-skeleton-item__element {
      .nmorph-icon {
        --nmorph-private-icon-color: var(--nmorph-text-color);
      }
    }
  }

  &.nmorph-skeleton-item--circle {
    border-radius: var(--border-radius-circular);
  }

  &.nmorph-skeleton-item--nmorph-design {
    background: var(--nmorph-main-color);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-skeleton-item--plain-design {
    border: var(--nmorph-plain-border);
  }
}
</style>
