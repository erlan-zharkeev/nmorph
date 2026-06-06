<script setup lang="ts">
import { NmorphShadowType } from '@/types';
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { toCssSize, useModifiers } from '@/utils';
import type { INmorphCardProps } from './types';

const props = withDefaults(defineProps<INmorphCardProps>(), {
  design: 'nmorph',
  shadowType: 'outset',
  combinedShadowBorderWidth: 0,
  cardPadding: undefined,
  padding: undefined,
  radius: undefined,
  contentPadding: undefined,
  contentClass: '',
  fill: true,
  tag: 'div',
});

const slots = useSlots();
const resolvedDesign = computed(() => props.design || 'nmorph');

const modifiers = computed(() =>
  useModifiers({
    nmorph: [resolvedDesign.value === 'nmorph' ? NmorphShadowType[props.shadowType] : ''],
    'nmorph-card': [resolvedDesign.value, props.shadowType, props.fill ? 'fill' : 'fit-content'],
  })
);

const styles = computed<CSSProperties>(() => {
  const cardPadding = props.padding !== undefined ? toCssSize(props.padding) : toCssSize(props.cardPadding);
  const cardRadius = toCssSize(props.radius);
  const contentPadding = toCssSize(props.contentPadding);

  return {
    ...(props.shadowType === 'combined' && {
      '--nmorph-private-card-combined-border-width': `${props.combinedShadowBorderWidth}px`,
    }),
    ...(cardPadding !== undefined && { '--nmorph-private-card-padding': cardPadding, padding: cardPadding }),
    ...(cardRadius !== undefined && { '--nmorph-private-card-radius': cardRadius }),
    ...(contentPadding !== undefined && { '--nmorph-private-card-content-padding': contentPadding }),
  };
});
</script>

<template>
  <component :is="props.tag" :class="modifiers" :style="styles">
    <div v-if="slots.header" class="nmorph-card__header">
      <slot name="header" />
    </div>
    <div :class="['nmorph-card__content', props.contentClass]">
      <slot />
    </div>
    <div v-if="slots.footer" class="nmorph-card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<style lang="scss">
.nmorph-card {
  --nmorph-private-card-padding: var(--indentation-04);
  --nmorph-private-card-background: var(--nmorph-main-color);
  --nmorph-private-card-border: none;
  --nmorph-private-card-shadow: none;

  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: fit-content;
  max-width: 100%;
  padding: var(--nmorph-private-card-padding);
  background: var(--nmorph-private-card-background);
  border: var(--nmorph-private-card-border);
  border-radius: var(--nmorph-private-card-radius, var(--default-border-radius));
  box-shadow: var(--nmorph-private-card-shadow);

  &.nmorph-card--fill {
    width: 100%;
  }

  .nmorph-card__content {
    height: 100%;
    padding: var(--nmorph-private-card-content-padding, 0);
  }

  .nmorph-card__header {
    font-weight: var(--nmorph-typography-title-font-weight);
    font-size: var(--nmorph-typography-title-font-size);
    line-height: var(--nmorph-typography-title-line-height);
  }

  .nmorph-card__footer {
    height: fit-content;
    margin-top: 4px;
    font-weight: var(--nmorph-typography-body-small-font-weight);
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
  }

  &.nmorph-card--nmorph {
    --nmorph-private-card-background: var(--nmorph-main-color);
  }

  &:not(.nmorph-card--plain).nmorph-card--outset {
    --nmorph-private-card-shadow: var(--nmorph-shadow-outset);
  }

  &:not(.nmorph-card--plain).nmorph-card--inset {
    --nmorph-private-card-shadow: var(--nmorph-shadow-inset);
  }

  &:not(.nmorph-card--plain).nmorph-card--combined {
    --nmorph-private-card-border: var(--nmorph-private-card-combined-border-width) solid var(--nmorph-main-color);
    --nmorph-private-card-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color),
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  &.nmorph-card--plain {
    --nmorph-private-card-background: var(--nmorph-main-color);
    --nmorph-private-card-border: var(--nmorph-plain-border);
    --nmorph-private-card-shadow: none;
  }
}
</style>
