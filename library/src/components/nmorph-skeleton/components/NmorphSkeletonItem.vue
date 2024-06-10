<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphSkeletonItemPropsType } from '../types';
import NmorphIcon from './../../nmorph-icon/NmorphIcon.vue';

interface INmorphProps {
  variant?: NmorphSkeletonItemPropsType;
}
const props = withDefaults(defineProps<INmorphProps>(), {
  variant: 'text',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton-item': [props.variant],
  })
);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-skeleton-item__element">
      <NmorphIcon v-if="props.variant === 'image'" name="image" width="50%" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-skeleton-item {
  height: 14px;
  background: var(--info-color-01);
  margin-bottom: var(--indentation-02);
}

.nmorph-skeleton-item--image {
  @include flex-full-center;

  .nmorph-skeleton-item__element {
    @include flex-full-center;
    .nmorph-icon {
      --color: var(--info-color-01);
    }
  }
}

.nmorph-skeleton-item--h1 {
  height: 18px;
}

.nmorph-skeleton-item--circle {
  border-radius: 100%;
}
</style>
