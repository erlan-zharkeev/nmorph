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
  paper: 0,
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
  const paper = Math.max(0, Number(props.paper) || 0);
  const paperOpacity = Math.min(paper * 0.08, 0.48);

  return {
    ...(props.shadowType === 'combined' && {
      '--nmorph-private-card-combined-border-width': `${props.combinedShadowBorderWidth}px`,
    }),
    ...(cardPadding !== undefined && { '--nmorph-private-card-padding': cardPadding, padding: cardPadding }),
    ...(cardRadius !== undefined && { '--nmorph-private-card-radius': cardRadius }),
    ...(contentPadding !== undefined && { '--nmorph-private-card-content-padding': contentPadding }),
    ...(paperOpacity > 0 && { '--nmorph-private-card-paper-opacity': String(paperOpacity) }),
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
  --nmorph-private-card-paper-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' opacity='.72' filter='url(%23n)'/%3E%3C/svg%3E");
  --nmorph-private-card-paper-opacity: 0;
  --nmorph-private-card-paper-shadow-color: color-mix(in srgb, var(--nmorph-dark-shade-color) 82%, transparent);
  --nmorph-private-card-paper-light-color: color-mix(in srgb, var(--nmorph-light-shade-color) 76%, transparent);

  position: relative;
  isolation: isolate;
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

  &::before {
    position: absolute;
    z-index: 0;
    background-image:
      var(--nmorph-private-card-paper-noise),
      radial-gradient(circle at 1px 1px, var(--nmorph-private-card-paper-shadow-color) 0 1px, transparent 1.7px),
      radial-gradient(circle at 6px 4px, var(--nmorph-private-card-paper-light-color) 0 1px, transparent 1.8px);
    background-size:
      72px 72px,
      11px 11px,
      16px 16px;
    border-radius: inherit;
    opacity: var(--nmorph-private-card-paper-opacity);
    pointer-events: none;
    content: '';
    inset: 0;
  }

  &.nmorph-card--fill {
    width: 100%;
  }

  .nmorph-card__header,
  .nmorph-card__content {
    position: relative;
    z-index: 1;
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
    position: relative;
    z-index: 1;
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
