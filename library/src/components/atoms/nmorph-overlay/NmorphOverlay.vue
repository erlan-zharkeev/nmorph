<script setup lang="ts">
import { computed } from 'vue';
import { createModifiers } from './../../../utils';

interface IProps {
  show?: boolean;
  outsideClickEmitEvent?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  show: false,
  outsideClickEmitEvent: true,
});

const modifiers = computed(() =>
  createModifiers('nmorph-overlay', [props.outsideClickEmitEvent ? 'outside-click' : '', props.show ? 'show' : ''])
);

const clickHandler = () => {
  emit('on-outside-click');
};

export interface IEmit {
  (e: 'on-outside-click'): void;
}

const emit = defineEmits<IEmit>();
</script>

<template>
  <div :class="modifiers" @click="clickHandler">
    <slot name="default" />
  </div>
</template>

<style lang="scss">
.nmorph-overlay {
  opacity: 0;
  @include overlay;
}

.nmorph-overlay--outside-click {
  cursor: pointer;
}
.nmorph-overlay--show {
  opacity: 1;
  pointer-events: auto;
}
</style>
