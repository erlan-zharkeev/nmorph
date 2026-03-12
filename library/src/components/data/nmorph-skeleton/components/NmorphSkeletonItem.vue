<script setup lang="ts">
import { computed } from 'vue';
import { nmorphInset, useModifiers } from '@/utils';
import { NmorphIcon, NmorphIconImage, NmorphSkeletonItemPropsType } from '@/components';
import { NmorphElementDesignType } from '@/types';
import { styled, css } from '@vue-styled-components/core';

interface INmorphProps {
  variant: keyof typeof NmorphSkeletonItemPropsType;
  width: string;
  height: string;
  design?: NmorphElementDesignType;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  variant: 'rect',
  width: 'auto',
  height: 'auto',
  design: 'nmorph',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-skeleton-item': [props.variant, `${props.design === 'nmorph' ? 'nmorph-design' : ''}`],
  })
);

const cssWidth = computed(() => props.width);
const cssHeight = computed(() => props.height);

const commonCSS = css`
  position: relative;
  margin-bottom: var(--indentation-02);
  overflow: hidden;
  background: var(--nmorph-text-color);

  &.nmorph-skeleton-item--image {
    background: none;

    .nmorph-skeleton-item__element {
      .nmorph-icon {
        --color: var(--nmorph-text-color);
      }
    }
  }

  &.nmorph-skeleton-item--circle {
    border-radius: var(--border-radius-circular);
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
  width: ${cssWidth.value};
  height: ${cssHeight.value};
  &.nmorph-skeleton-item--nmorph-design {
    ${nmorphInset()}
  }
`;
</script>

<template>
  <StyledComponent :class="modifiers">
    <div class="nmorph-skeleton-item__element">
      <NmorphIcon v-if="props.variant === 'image'" :width="props.width" :height="props.height">
        <NmorphIconImage />
      </NmorphIcon>
    </div>
  </StyledComponent>
</template>
