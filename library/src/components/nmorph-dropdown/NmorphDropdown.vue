<script setup lang="ts">
import { computed, ref } from 'vue';
import { getModifiers } from '@/utils';
import { usePlacement } from '@/hooks';
import { NmorphDomElement } from '@/types/common';

interface IProps {
  open: boolean;
  relativeElement: NmorphDomElement;
  width?: number;
  xOffset?: number;
  yOffset?: number;
}
const props = withDefaults(defineProps<IProps>(), {
  width: 160,
  xOffset: 0,
  yOffset: 0,
});

// interface IEmit {}
// const emit = defineEmits<IEmit>();

const dropdownDOMRef = ref<NmorphDomElement>(null);

const { placementCoords } = usePlacement({
  initialPlacement: 'bottom',
  dropdownDOMElement: dropdownDOMRef,
  blockPosition: false,
  relativeElement: props.relativeElement,
  yOffset: props.yOffset,
  xOffset: props.xOffset,
});

const modifiers = computed(() =>
  getModifiers({
    nmorph: [],
    'nmorph-dropdown': [],
  })
);

const width = computed(() => `${props.width}px`);
</script>

<template>
  <div ref="dropdownDOMRef" :class="modifiers" :style="{ left: `${placementCoords.x}`, top: `${placementCoords.y}` }">
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-dropdown {
  position: fixed;
  width: v-bind(width);
  @include nmorph-outset;
}
</style>
