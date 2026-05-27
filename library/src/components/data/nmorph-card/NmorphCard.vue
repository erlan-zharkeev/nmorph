<script setup lang="ts">
import { NmorphShadowType } from '@/types';
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { toCssSize, useModifiers } from '@/utils';
import type { INmorphCardProps } from './types';

const props = withDefaults(defineProps<INmorphCardProps>(), {
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

const modifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphShadowType[props.shadowType]],
    'nmorph-card': [props.shadowType, props.fill ? 'fill' : 'fit-content'],
  })
);

const styles = computed<CSSProperties>(() => {
  const cardPadding = props.padding !== undefined ? toCssSize(props.padding) : toCssSize(props.cardPadding);
  const cardRadius = toCssSize(props.radius);
  const contentPadding = toCssSize(props.contentPadding);

  return {
    ...(props.shadowType === 'combined' && {
      '--nmorph-card-combined-border-width': `${props.combinedShadowBorderWidth}px`,
    }),
    ...(cardPadding !== undefined && { '--card-padding': cardPadding, padding: cardPadding }),
    ...(cardRadius !== undefined && { '--nmorph-card-radius': cardRadius }),
    ...(contentPadding !== undefined && { '--nmorph-card-content-padding': contentPadding }),
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
  --card-padding: var(--indentation-04);

  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 100%;
  padding: var(--card-padding);
  border-radius: var(--nmorph-card-radius, var(--default-border-radius));

  &.nmorph-card--fill {
    width: 100%;
  }

  .nmorph-card__content {
    height: 100%;
    padding: var(--nmorph-card-content-padding, 0);
  }

  .nmorph-card__header {
    font-weight: 600;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }

  .nmorph-card__footer {
    height: fit-content;
    margin-top: 4px;
    font-weight: 400;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
  }

  &.nmorph--shadow-combined {
    background: var(--nmorph-main-color);
    border: var(--nmorph-card-combined-border-width) solid var(--nmorph-main-color);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color),
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-0.5 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }
}
</style>
