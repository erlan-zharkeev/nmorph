<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { useZIndex } from '@/hooks';

interface INmorphProps {
  show: boolean;
  transparent?: boolean;
  zIndex?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  transparent: false,
});

const zIndex = useZIndex(
  computed(() => props.show),
  () => props.zIndex
);

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
</script>

<template>
  <div :class="modifiers" :style="{ '--nmorph-overlay-z-index': zIndex }" @click.stop="clickHandler">
    <div class="nmorph-overlay__slot" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-overlay {
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

  z-index: var(--nmorph-overlay-z-index);
}
</style>
