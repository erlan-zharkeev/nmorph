<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, createCssVariables, useMergedAttrs } from '@/utils';
import type { INmorphCalloutProps } from './types';

defineOptions({
  inheritAttrs: false,
});

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
  titleFontSize: 'var(--nmorph-typography-title-small-font-size)',
  contentFontSize: 'var(--nmorph-typography-body-small-font-size)',
});

const slots = useSlots();

const styles = computed<CSSProperties>(() => ({
  ...createCssSizeVariables({
    '--nmorph-private-callout-padding': props.padding,
    '--nmorph-private-callout-border-radius': props.borderRadius,
    '--nmorph-private-callout-accent-width': props.accentWidth,
    '--nmorph-private-callout-title-gap': props.titleGap,
    '--nmorph-private-callout-title-font-size': props.titleFontSize,
    '--nmorph-private-callout-content-font-size': props.contentFontSize,
  }),
  ...createCssVariables({
    '--nmorph-private-callout-color': props.color,
  }),
}));

const resolvedTarget = computed(() => {
  if (!props.target) return undefined;
  return props.target in targetMap ? targetMap[props.target as keyof typeof targetMap] : props.target;
});

const linkAttrs = computed(() => {
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
const mergedAttrs = useMergedAttrs(
  computed(() => ['nmorph-callout', `nmorph-callout--${props.type}`]),
  styles
);
const rootAttrs = computed(() => ({
  ...mergedAttrs.value,
  ...linkAttrs.value,
}));

const hasHeader = computed(() => Boolean(slots.header || slots.title || props.title));
const hasDefaultContent = computed(() => Boolean(slots.default));
</script>

<template>
  <component :is="props.as" v-bind="rootAttrs">
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
  --nmorph-private-callout-color: var(--nmorph-accent-color);
  --nmorph-private-callout-padding: var(--indentation-03) var(--indentation-04);
  --nmorph-private-callout-border-radius: var(--default-border-radius);
  --nmorph-private-callout-accent-width: var(--indentation-02);
  --nmorph-private-callout-title-gap: var(--indentation-03);
  --nmorph-private-callout-title-font-size: var(--nmorph-typography-title-small-font-size);
  --nmorph-private-callout-content-font-size: var(--nmorph-typography-body-small-font-size);

  position: relative;
  display: block;
  padding: var(--nmorph-private-callout-padding);
  overflow: hidden;
  color: inherit;
  text-decoration: none;
  border-radius: var(--nmorph-private-callout-border-radius);

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--nmorph-private-callout-accent-width);
    height: 100%;
    background: var(--nmorph-private-callout-color);
    content: '';
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--nmorph-private-callout-color);
    opacity: 0.2;
    content: '';
  }

  &.nmorph-callout--warning {
    --nmorph-private-callout-color: var(--nmorph-warn-color);
  }

  &.nmorph-callout--success {
    --nmorph-private-callout-color: var(--nmorph-success-color);
  }

  &.nmorph-callout--error {
    --nmorph-private-callout-color: var(--nmorph-error-color);
  }

  .nmorph-callout__title {
    margin-bottom: var(--nmorph-private-callout-title-gap);
    font-weight: var(--nmorph-typography-title-small-font-weight);
    font-size: var(--nmorph-private-callout-title-font-size);
    line-height: var(--nmorph-typography-title-small-line-height);
  }

  .nmorph-callout__title,
  .nmorph-callout__content {
    position: relative;
    z-index: 1;
  }

  .nmorph-callout__content {
    font-weight: var(--nmorph-typography-body-small-font-weight);
    font-size: var(--nmorph-private-callout-content-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
    white-space: pre-wrap;
  }
}
</style>
