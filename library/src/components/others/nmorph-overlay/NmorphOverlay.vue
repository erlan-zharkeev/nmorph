<script setup lang="ts">
import { useModifiers } from '@/utils';
import { computed } from 'vue';

interface INmorphProps {
  show: boolean;
  outsideClickEmitEvent?: boolean;
  transparent?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  show: false,
  outsideClickEmitEvent: true,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-overlay': [
      `${props.outsideClickEmitEvent && 'outside-click'}`,
      `${props.show && 'show'}`,
      `${props.transparent && 'transparent'}`,
    ],
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

  @include overlay;
}

.nmorph-overlay--outside-click {
  cursor: pointer;
}

.nmorph-overlay--transparent {
  background: transparent;
}

.nmorph-overlay--show {
  opacity: 1;
  pointer-events: auto;
}
</style>
