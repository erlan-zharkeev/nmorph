<script setup lang="ts">
import type { NmorphCalloutType } from './types';

interface INmorphProps {
  type?: NmorphCalloutType;
  title?: string;
  content: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: 'info',
  title: '',
});
</script>

<template>
  <div class="nmorph-callout" :class="`nmorph-callout--${props.type}`">
    <div v-if="props.title" class="nmorph-callout__title">{{ props.title }}</div>
    <div class="nmorph-callout__content" v-html="props.content" />
  </div>
</template>

<style lang="scss">
.nmorph-callout {
  --callout-color: var(--nmorph-accent-color);

  position: relative;
  padding: 8px 12px;
  overflow: hidden;
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
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
    font-weight: 600;
    font-size: var(--font-size-medium);
    line-height: var(--line-height-loose);
    margin-bottom: 8px;
  }

  .nmorph-callout__title,
  .nmorph-callout__content {
    position: relative;
    z-index: 1;
  }

  .nmorph-callout__content {
    font-weight: 400;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    white-space: pre-wrap;
  }
}
</style>
