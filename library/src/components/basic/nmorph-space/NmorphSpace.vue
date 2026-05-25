<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { toCssSize, useModifiers } from '@/utils';
import type { INmorphSpaceProps, NmorphSpaceSizeType } from './types';

const props = withDefaults(defineProps<INmorphSpaceProps>(), {
  tag: 'div',
  direction: 'row',
  size: 'medium',
  align: 'start',
  justify: 'start',
  wrap: false,
  inline: false,
  fill: false,
});

const sizeMap = {
  small: '4px',
  medium: '8px',
  large: '16px',
};

const modifiers = computed(() =>
  useModifiers({
    'nmorph-space': [props.direction, props.wrap && 'wrap', props.inline && 'inline', props.fill && 'fill'],
  })
);

const resolveSpaceSize = (value: NmorphSpaceSizeType) => {
  return toCssSize(sizeMap[value as keyof typeof sizeMap] || value);
};

const alignItems = computed(() =>
  props.align === 'start' || props.align === 'end' ? `flex-${props.align}` : props.align
);
const justifyContent = computed(() =>
  props.justify === 'start' || props.justify === 'end' ? `flex-${props.justify}` : props.justify
);

const styles = computed<CSSProperties>(() => ({
  '--nmorph-space-gap': resolveSpaceSize(props.size),
  '--nmorph-space-align': alignItems.value,
  '--nmorph-space-justify': justifyContent.value,
}));
</script>

<template>
  <component :is="props.tag" :class="modifiers" :style="styles">
    <slot />
  </component>
</template>

<style lang="scss">
.nmorph-space {
  display: flex;
  flex-direction: row;
  gap: var(--nmorph-space-gap);
  justify-content: var(--nmorph-space-justify);
  align-items: var(--nmorph-space-align);
  min-width: 0;

  &--column {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--inline {
    display: inline-flex;
  }

  &--fill {
    width: 100%;
  }
}
</style>
