<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import type { INmorphIconProps } from './types';

const props = withDefaults(defineProps<INmorphIconProps>(), {
  size: 'small',
  width: undefined,
  height: undefined,
  color: undefined,
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
  if (props.width) styles['--width'] = props.width;
  if (props.height) styles['--height'] = props.height;
  if (props.color) {
    styles['--nmorph-icon-color'] = props.color;
    styles['--color'] = props.color;
  }
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
  width: var(--width);
  min-width: var(--width);
  height: var(--height);
  min-height: var(--height);

  .nmorph-icon__content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--width);
    min-width: var(--width);
    height: var(--height);
    min-height: var(--height);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: var(--color);
    stroke-width: 0;
  }

  path {
    stroke: var(--color);
  }

  &.nmorph-icon--small {
    --width: 14px;
    --height: 14px;
  }

  &.nmorph-icon--medium {
    --width: 20px;
    --height: 20px;
  }

  &.nmorph-icon--large {
    --width: 32px;
    --height: 32px;
  }

  --color: var(--nmorph-icon-color, var(--nmorph-text-color));
}
</style>
