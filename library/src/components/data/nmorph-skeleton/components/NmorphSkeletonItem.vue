<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphSkeletonItemPropsType } from '@/components';

interface INmorphProps {
  variant: keyof typeof NmorphSkeletonItemPropsType;
  width: string;
  height: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  variant: 'rect',
  width: 'auto',
  height: 'auto',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton-item': [props.variant],
  })
);

const cssWidth = computed(() => props.width);
const cssHeight = computed(() => props.height);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-skeleton-item__element">
      <NmorphIcon v-if="props.variant === 'image'" name="image" :width="props.width" :height="props.height" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-skeleton-item {
  margin-bottom: var(--indentation-02);
  background: var(--nmorph-text-color);
  position: relative;
  width: v-bind(cssWidth);
  height: v-bind(cssHeight);
}

.nmorph-skeleton-item--image {
  background: none;

  .nmorph-skeleton-item__element {
    .nmorph-icon {
      --color: var(--nmorph-text-color);
    }
  }
}

.nmorph-skeleton-item--circle {
  border-radius: var(--border-radius-circular);
}
</style>
