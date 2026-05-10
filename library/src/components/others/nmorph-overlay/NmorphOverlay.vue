<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';
import { useZIndex } from '@/hooks';

interface INmorphProps {
  show: boolean;
  transparent?: boolean;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  transparent: false,
  zIndex: undefined,
  teleportTo: 'body',
  disabledTeleport: false,
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
  <Teleport :to="props.teleportTo" :disabled="props.disabledTeleport || !props.show">
    <div :class="modifiers" :style="{ '--nmorph-overlay-z-index': zIndex }" @click.stop="clickHandler">
      <div class="nmorph-overlay__slot" @click.stop>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--nmorph-overlay-z-index);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--nmorph-overlay-color);
  opacity: 0;
  transition: ease-in-out var(--transition-02) opacity;
  pointer-events: none;

  &.nmorph-overlay--transparent {
    background: transparent;
  }

  &.nmorph-overlay--show {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
