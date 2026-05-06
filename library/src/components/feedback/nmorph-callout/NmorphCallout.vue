<script setup lang="ts">
import { styled, css } from '@vue-styled-components/core';
import { body3, title3 } from '@/utils';
import type { NmorphCalloutType } from './types';

interface INmorphProps {
  type?: NmorphCalloutType;
  title: string;
  content: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  type: 'info',
});

const commonCSS = css`
  position: relative;
  padding: 8px 12px;
  margin-bottom: 8px;
  overflow: hidden;
  border-radius: 4px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: var(--nmorph-accent-color);
    content: '';
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--nmorph-accent-color);
    opacity: 0.2;
    content: '';
  }

  &.nmorph-callout--warning {
    &::before,
    &::after {
      background: var(--nmorph-warn-color);
    }
  }

  .nmorph-callout__title {
    ${title3()}
    margin-bottom: 8px;
  }

  .nmorph-callout__title,
  .nmorph-callout__content {
    position: relative;
    z-index: 1;
  }

  .nmorph-callout__content {
    ${body3()}
    white-space: pre-wrap;
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
`;
</script>

<template>
  <StyledComponent class="nmorph-callout" :class="`nmorph-callout--${props.type}`">
    <div class="nmorph-callout__title">{{ props.title }}</div>
    <div class="nmorph-callout__content" v-html="props.content" />
  </StyledComponent>
</template>
