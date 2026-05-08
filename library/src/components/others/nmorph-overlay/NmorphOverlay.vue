<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { styled, css } from '@vue-styled-components/core'
import { useZIndex } from '@/hooks';

interface INmorphProps {
  show: boolean;
  transparent?: boolean;
  zIndex?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  transparent: false,
});

const zIndex = useZIndex(computed(() => props.show), () => props.zIndex);
const styledProps = computed(() => ({ zIndex: zIndex.value }));

const modifiers = computed(() =>
  useModifiers({
    'nmorph-overlay': [`${props.show && 'show'}`, `${props.transparent && 'transparent'}`],
  })
);

const clickHandler = () => {
  emit('on-outside-click');
};

interface INmorphEmit {
  (e: 'on-outside-click'): void;
}

const emit = defineEmits<INmorphEmit>();

const commonCSS = css`
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--nmorph-overlay-color);
  transition: ease-in-out var(--transition-02) opacity;

  &.nmorph-overlay--transparent {
    background: transparent;
  }

  &.nmorph-overlay--show {
    opacity: 1;
    pointer-events: auto;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  z-index: ${props => props.zIndex};
`
</script>

<template>
  <StyledComponent :class="modifiers" :props="styledProps" @click.stop="clickHandler">
    <div class="nmorph-overlay__slot" @click.stop>
      <slot />
    </div>
  </StyledComponent>
</template>
