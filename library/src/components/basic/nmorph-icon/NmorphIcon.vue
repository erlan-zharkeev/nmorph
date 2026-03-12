<script setup lang="ts">
import { computed } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphIconSize } from '@/components';
import { styled, css } from '@vue-styled-components/core';

interface INmorphProps {
  size?: keyof typeof NmorphIconSize;
  width?: string;
  height?: string;
  color?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  size: 'small',
  width: undefined,
  height: undefined,
  color: 'var(--nmorph-text-color)',
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-icon': [
      `${!props.width && !props.height && props.size}`,
      `${props.width && 'custom-width'}`,
      `${props.height && 'custom-height'}`,
    ],
  })
);

const customStyles = computed(() => {
  const styles: { [key: string]: string } = {};
  if (props.width) styles['--width'] = props.width;
  if (props.height) styles['--height'] = props.height;
  return styles;
});

const commonCSS = css`
  width: var(--width);
  min-width: var(--width);
  height: var(--height);
  min-height: var(--height);

  display: flex;
  align-items: center;

  .nmorph-icon__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    min-width: var(--width);
    height: var(--height);
    min-height: var(--height);
  }

  svg {
    width: 100%;
    height: 100%;

    fill: var(--color);
    stroke-width: 0;
  }

  path {
    stroke: var(--color);
  }

  &.nmorph-icon--small {
    --width: 14px;
    --height: 14px;
  }

  &.nmorph-icon--medium {
    --width: 20px;
    --height: 20px;
  }

  &.nmorph-icon--large {
    --width: 32px;
    --height: 32px;
  }
`;

const StyledComponent = styled.div`
  ${commonCSS}
  --color: ${(props) => props.color};
`;
</script>

<template>
  <StyledComponent :class="modifiers" :style="customStyles" :props="{ color: props.color }">
    <div class="nmorph-icon__content">
      <slot />
    </div>
  </StyledComponent>
</template>
