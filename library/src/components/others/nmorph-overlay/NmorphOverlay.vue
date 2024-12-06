<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';

interface INmorphProps {
  show: boolean;
  transparent?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  transparent: false,
});

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
  <div :class="modifiers" @click.stop="clickHandler">
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
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--nmorph-overlay-color);
  transition: ease-in-out var(--transition-02) opacity;
}

.nmorph-overlay--transparent {
  background: transparent;
}

.nmorph-overlay--show {
  opacity: 1;
  pointer-events: auto;
}
</style>
