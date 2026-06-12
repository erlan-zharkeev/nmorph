<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import type { INmorphIconProps } from './types';

const props = withDefaults(defineProps<INmorphIconProps>(), {
  size: 'small',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-icon': [
      !props.width && !props.height && props.size,
      props.width && 'custom-width',
      props.height && 'custom-height',
    ],
  })
);

const customStyles = computed(() => {
  const styles: { [key: string]: string } = {};
  if (props.width) styles['--nmorph-private-icon-width'] = props.width;
  if (props.height) styles['--nmorph-private-icon-height'] = props.height;
  if (props.color) styles['--nmorph-private-icon-color'] = props.color;
  return styles;
});
</script>

<template>
  <div :class="modifiers" :style="customStyles">
    <div class="nmorph-icon__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--nmorph-private-icon-width);
  min-width: var(--nmorph-private-icon-width);
  height: var(--nmorph-private-icon-height);
  min-height: var(--nmorph-private-icon-height);
  color: var(--nmorph-private-icon-color);

  .nmorph-icon__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-private-icon-width);
    min-width: var(--nmorph-private-icon-width);
    height: var(--nmorph-private-icon-height);
    min-height: var(--nmorph-private-icon-height);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: var(--nmorph-private-icon-color);
  }

  svg,
  svg * {
    color: var(--nmorph-private-icon-color);
  }

  path[stroke],
  path[stroke-width],
  path[fill='none'],
  rect[stroke],
  rect[stroke-width],
  rect[fill='none'],
  line[stroke],
  line[stroke-width],
  polyline[stroke],
  polyline[stroke-width],
  polygon[stroke],
  polygon[stroke-width] {
    stroke: var(--nmorph-private-icon-color);
  }

  &.nmorph-icon--small {
    --nmorph-private-icon-width: 14px;
    --nmorph-private-icon-height: 14px;
  }

  &.nmorph-icon--medium {
    --nmorph-private-icon-width: 20px;
    --nmorph-private-icon-height: 20px;
  }

  &.nmorph-icon--large {
    --nmorph-private-icon-width: 32px;
    --nmorph-private-icon-height: 32px;
  }

  --nmorph-private-icon-color: var(--nmorph-text-color);
}
</style>
