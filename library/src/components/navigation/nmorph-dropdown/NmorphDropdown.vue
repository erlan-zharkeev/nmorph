<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import { usePlacement } from '@/hooks';
import { NmorphDomElementType, NmorphPlacementType } from '@/types';
import { NmorphOverlay } from '@/components';

interface INmorphProps {
  open: boolean;
  relativeElement: NmorphDomElementType;
  placement?: NmorphPlacementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
  zIndex?: number;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  role?: string;
  ariaLabel?: string;
  contentClass?: string;
  hideShadow?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  placement: 'bottom',
  width: 160,
  minWidth: undefined,
  maxWidth: undefined,
  xOffset: 0,
  yOffset: 0,
  fillWidth: true,
  zIndex: undefined,
  closeOnEscape: true,
  trapFocus: false,
  restoreFocus: true,
  role: 'listbox',
  ariaLabel: '',
  contentClass: '',
  hideShadow: false,
});

interface INmorphEmit {
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}
const emit = defineEmits<INmorphEmit>();

const dropdownDOMRef = ref<NmorphDomElementType>(null);

const { placementCoords, placementReady, adjustPlacement } = usePlacement({
  initialPlacement: toRef(props, 'placement'),
  contentDOMElement: dropdownDOMRef,
  relativeElement: toRef(props, 'relativeElement'),
  yOffset: toRef(props, 'yOffset'),
  xOffset: toRef(props, 'xOffset'),
  enabled: toRef(props, 'open'),
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-dropdown': [`${!props.open && 'closed'}`, `${props.hideShadow && 'hide-shadow'}`],
  })
);

const getCssSize = (value?: number | string) => (typeof value === 'number' ? `${value}px` : value);

const width = computed(() =>
  props.fillWidth && props.relativeElement ? `${props.relativeElement.clientWidth}px` : getCssSize(props.width)
);

const dropdownStyle = computed<CSSProperties>(() => ({
  '--nmorph-dropdown-width': width.value,
  '--nmorph-dropdown-min-width': getCssSize(props.minWidth) || 'auto',
  '--nmorph-dropdown-max-width': getCssSize(props.maxWidth) || 'none',
  left: placementCoords.value.x,
  top: placementCoords.value.y,
  visibility: props.open && placementReady.value ? 'visible' : 'hidden',
}));

watch(
  () => props.open,
  (open) => {
    if (open) adjustPlacement();
  },
  { flush: 'post' }
);

const outsideClickHandler = () => {
  emit('on-outside-click');
};

const escapeHandler = () => {
  emit('on-escape-keydown');
};
</script>

<template>
  <NmorphOverlay
    :show="props.open"
    transparent
    :z-index="props.zIndex"
    :close-on-escape="props.closeOnEscape"
    :trap-focus="props.trapFocus"
    :restore-focus="props.restoreFocus"
    @on-outside-click="outsideClickHandler"
    @on-escape-keydown="escapeHandler"
  >
    <div
      v-if="props.open"
      ref="dropdownDOMRef"
      :class="[modifiers, props.contentClass]"
      :style="dropdownStyle"
      :role="props.role || undefined"
      :aria-label="props.ariaLabel || undefined"
    >
      <slot />
    </div>
  </NmorphOverlay>
</template>

<style lang="scss">
.nmorph-dropdown {
  position: fixed;
  width: var(--nmorph-dropdown-width);
  min-width: var(--nmorph-dropdown-min-width);
  max-width: var(--nmorph-dropdown-max-width);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-outset);
}

.nmorph-dropdown--closed {
  z-index: -1000;
  opacity: 0;
}

.nmorph-dropdown--hide-shadow {
  box-shadow: none;
}
</style>
