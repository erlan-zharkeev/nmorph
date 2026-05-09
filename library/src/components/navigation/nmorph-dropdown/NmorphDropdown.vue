<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModifiers } from '@/utils';
import { usePlacement } from '@/hooks';
import { NmorphDomElementType } from '@/types';
import { NmorphOverlay } from '@/components';

interface INmorphProps {
  open: boolean;
  relativeElement: NmorphDomElementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
  zIndex?: number;
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

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

const width = computed(() => (props.fillWidth ? `${props.relativeElement?.clientWidth}px` : getCssSize(props.width)));

const outsideClickHandler = () => {
  emit('on-outside-click');
};
</script>

<template>
  <div
    :style="{
      '--nmorph-dropdown-width': width,
      '--nmorph-dropdown-min-width': getCssSize(props.minWidth) || 'auto',
      '--nmorph-dropdown-max-width': getCssSize(props.maxWidth) || 'none',
    }"
  >
    <NmorphOverlay :show="props.open" transparent :z-index="props.zIndex" @on-outside-click="outsideClickHandler">
      <div
        ref="dropdownDOMRef"
        :class="modifiers"
        :style="{ left: `${placementCoords.x}`, top: `${placementCoords.y}` }"
      >
        <slot />
      </div>
    </NmorphOverlay>
  </div>
</template>

<style lang="scss">
.nmorph-dropdown {
  position: fixed;
  border-radius: var(--default-border-radius);

  background: var(--nmorph-main-color);
  box-shadow:
    var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.nmorph-dropdown--closed {
  z-index: -1000;
  opacity: 0;
}

.nmorph-dropdown {
  width: var(--nmorph-dropdown-width);
  min-width: var(--nmorph-dropdown-min-width);
  max-width: var(--nmorph-dropdown-max-width);
}
</style>
