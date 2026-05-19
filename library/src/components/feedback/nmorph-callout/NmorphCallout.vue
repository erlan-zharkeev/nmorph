<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import type { NmorphCalloutType } from './types';

interface INmorphProps {
  type?: NmorphCalloutType;
  title?: string;
  content: string;
  color?: string;
  padding?: number | string;
  borderRadius?: number | string;
  accentWidth?: number | string;
  titleGap?: number | string;
  titleFontSize?: number | string;
  contentFontSize?: number | string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: 'info',
  title: '',
  color: undefined,
  padding: 'var(--indentation-03) var(--indentation-04)',
  borderRadius: 'var(--default-border-radius)',
  accentWidth: 'var(--indentation-02)',
  titleGap: 'var(--indentation-03)',
  titleFontSize: 'var(--font-size-medium)',
  contentFontSize: 'var(--font-size-extra-small)',
});

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

const styles = computed<CSSProperties>(() => ({
  '--callout-padding': getCssSize(props.padding),
  '--callout-border-radius': getCssSize(props.borderRadius),
  '--callout-accent-width': getCssSize(props.accentWidth),
  '--callout-title-gap': getCssSize(props.titleGap),
  '--callout-title-font-size': getCssSize(props.titleFontSize),
  '--callout-content-font-size': getCssSize(props.contentFontSize),
  ...(props.color !== undefined && { '--callout-color': props.color }),
}));
</script>

<template>
  <div class="nmorph-callout" :class="`nmorph-callout--${props.type}`" :style="styles">
    <div v-if="props.title" class="nmorph-callout__title">{{ props.title }}</div>
    <div class="nmorph-callout__content" v-html="props.content" />
  </div>
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
  padding: var(--callout-padding);
  overflow: hidden;
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
