<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { usePlacement } from '@/hooks';
import { NmorphDomElementType } from '@/types/common';
import { NmorphOverlay } from '@/components';

interface INmorphProps {
  open: boolean;
  relativeElement: NmorphDomElementType;
  width?: number;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  width: 160,
  xOffset: 0,
  yOffset: 0,
  fillWidth: true,
});

interface INmorphEmit {
  (e: 'on-outside-click'): void;
}
const emit = defineEmits<INmorphEmit>();

const dropdownDOMRef = ref<NmorphDomElementType>(null);

const { placementCoords } = usePlacement({
  initialPlacement: 'bottom',
  contentDOMElement: dropdownDOMRef,
  relativeElement: props.relativeElement,
  yOffset: props.yOffset,
  xOffset: props.xOffset,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dropdown': [`${!props.open && 'closed'}`],
  })
);

const width = computed(() => (props.fillWidth ? `${props.relativeElement?.clientWidth}px` : `${props.width}px`));

const outsideClickHandler = () => {
  emit('on-outside-click');
};
</script>

<template>
  <NmorphOverlay :show="props.open" transparent @on-outside-click="outsideClickHandler">
    <div ref="dropdownDOMRef" :class="modifiers" :style="{ left: `${placementCoords.x}`, top: `${placementCoords.y}` }">
      <slot />
    </div>
  </NmorphOverlay>
</template>

<style lang="scss">
.nmorph-dropdown {
  position: fixed;
  width: v-bind(width);
  border-radius: var(--default-border-radius);

  @include nmorph-outset;
}

.nmorph-dropdown--closed {
  z-index: -1000;
  opacity: 0;
}
</style>
