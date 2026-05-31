<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, createCssVariables } from '@/utils';
import type { INmorphCalloutProps } from './types';

const targetMap = {
  self: '_self',
  blank: '_blank',
  parent: '_parent',
  top: '_top',
} as const;

const props = withDefaults(defineProps<INmorphCalloutProps>(), {
  type: 'info',
  title: '',
  content: '',
  as: 'div',
  href: undefined,
  target: undefined,
  rel: undefined,
  referrerpolicy: undefined,
  referrerPolicy: undefined,
  download: undefined,
  ariaLabel: undefined,
  color: undefined,
  padding: 'var(--indentation-03) var(--indentation-04)',
  borderRadius: 'var(--default-border-radius)',
  accentWidth: 'var(--indentation-02)',
  titleGap: 'var(--indentation-03)',
  titleFontSize: 'var(--font-size-medium)',
  contentFontSize: 'var(--font-size-extra-small)',
});

const slots = useSlots();

const styles = computed<CSSProperties>(() => ({
  ...createCssSizeVariables({
    '--callout-padding': props.padding,
    '--callout-border-radius': props.borderRadius,
    '--callout-accent-width': props.accentWidth,
    '--callout-title-gap': props.titleGap,
    '--callout-title-font-size': props.titleFontSize,
    '--callout-content-font-size': props.contentFontSize,
  }),
  ...createCssVariables({
    '--callout-color': props.color,
  }),
}));

const resolvedTarget = computed(() => {
  if (!props.target) return undefined;
  return props.target in targetMap ? targetMap[props.target as keyof typeof targetMap] : props.target;
});

const rootAttrs = computed(() => {
  if (props.as !== 'a') return {};

  return {
    href: props.href,
    target: resolvedTarget.value,
    rel: props.rel,
    referrerpolicy: props.referrerpolicy ?? props.referrerPolicy,
    download: props.download === true ? '' : props.download === false ? undefined : props.download,
    'aria-label': props.ariaLabel,
  };
});

const hasHeader = computed(() => Boolean(slots.header || slots.title || props.title));
const hasDefaultContent = computed(() => Boolean(slots.default));
</script>

<template>
  <component
    :is="props.as"
    class="nmorph-callout"
    :class="`nmorph-callout--${props.type}`"
    :style="styles"
    v-bind="rootAttrs"
  >
    <div v-if="hasHeader" class="nmorph-callout__title">
      <slot name="header">
        <slot name="title">{{ props.title }}</slot>
      </slot>
    </div>
    <div v-if="hasDefaultContent" class="nmorph-callout__content">
      <slot />
    </div>
    <div v-else class="nmorph-callout__content" v-html="props.content" />
  </component>
</template>

<style lang="scss">
.nmorph-callout {
  --callout-color: var(--nmorph-accent-color);
  --callout-padding: var(--indentation-03) var(--indentation-04);
  --callout-border-radius: var(--default-border-radius);
  --callout-accent-width: var(--indentation-02);
  --callout-title-gap: var(--indentation-03);
  --callout-title-font-size: var(--font-size-medium);
  --callout-content-font-size: var(--font-size-extra-small);

  position: relative;
  display: block;
  padding: var(--callout-padding);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border-radius: var(--callout-border-radius);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--callout-accent-width);
    height: 100%;
    background: var(--callout-color);
    content: '';
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--callout-color);
    opacity: 0.2;
    content: '';
  }

  &.nmorph-callout--warning {
    --callout-color: var(--nmorph-warn-color);
  }

  &.nmorph-callout--success {
    --callout-color: var(--nmorph-success-color);
  }

  &.nmorph-callout--error {
    --callout-color: var(--nmorph-error-color);
  }

  .nmorph-callout__title {
    margin-bottom: var(--callout-title-gap);
    font-weight: 600;
    font-size: var(--callout-title-font-size);
    line-height: var(--line-height-loose);
  }

  .nmorph-callout__title,
  .nmorph-callout__content {
    position: relative;
    z-index: 1;
  }

  .nmorph-callout__content {
    font-weight: 400;
    font-size: var(--callout-content-font-size);
    line-height: var(--line-height-regular);
    white-space: pre-wrap;
  }
}
</style>
