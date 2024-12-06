<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIcon, NmorphSkeletonItemPropsType } from '@/components';
import { NmorphElementDesignType } from '@/types';

interface INmorphProps {
  variant: keyof typeof NmorphSkeletonItemPropsType;
  width: string;
  height: string;
  design?: NmorphElementDesignType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  variant: 'rect',
  width: 'auto',
  height: 'auto',
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton-item': [props.variant, `${props.design === 'nmorph' ? 'nmorph-design' : ''}`],
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
@use '@/styles/mixins' as *;

.nmorph-skeleton-item {
  position: relative;
  width: v-bind(cssWidth);
  height: v-bind(cssHeight);
  margin-bottom: var(--indentation-02);
  overflow: hidden;
  background: var(--nmorph-text-color);
}

.nmorph-skeleton-item--nmorph-design {
  @include nmorph-inset;
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
