<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, toCssSize, useModifiers } from '@/utils';
import { usePlacement } from '@/hooks/use-placement';
import { NmorphDomElementType } from '@/types';
import { NmorphOverlay } from '@/components';
import type { INmorphDropdownEmit, INmorphDropdownProps } from './types';

const props = withDefaults(defineProps<INmorphDropdownProps>(), {
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
  design: 'nmorph',
});

const emit = defineEmits<INmorphDropdownEmit>();

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
    'nmorph-dropdown': [!props.open && 'closed', props.hideShadow && 'hide-shadow', props.design],
  })
);

const width = computed(() =>
  props.fillWidth && props.relativeElement ? `${props.relativeElement.clientWidth}px` : toCssSize(props.width)
);

const dropdownStyle = computed<CSSProperties>(() => ({
  '--nmorph-private-dropdown-width': width.value,
  ...createCssSizeVariables({
    '--nmorph-private-dropdown-min-width': props.minWidth === undefined ? 'auto' : props.minWidth,
    '--nmorph-private-dropdown-max-width': props.maxWidth === undefined ? 'none' : props.maxWidth,
  }),
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
  width: var(--nmorph-private-dropdown-width);
  min-width: var(--nmorph-private-dropdown-min-width);
  max-width: var(--nmorph-private-dropdown-max-width);
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

.nmorph-dropdown--plain {
  border: var(--nmorph-plain-border);
  box-shadow: none;
}
</style>
