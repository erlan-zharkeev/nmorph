<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import NmorphDropdown from '../nmorph-dropdown/NmorphDropdown.vue';
import type { NmorphDomElementType, NmorphPlacementType } from '@/types';

type NmorphContextMenuTrigger = 'contextmenu' | 'click' | 'both';

interface INmorphProps {
  modelValue?: boolean | null;
  trigger?: NmorphContextMenuTrigger;
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
  disabled?: boolean;
  role?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: null,
  trigger: 'contextmenu',
  placement: 'bottom-start',
  width: 160,
  minWidth: undefined,
  maxWidth: undefined,
  xOffset: 0,
  yOffset: 0,
  fillWidth: false,
  zIndex: undefined,
  closeOnEscape: true,
  trapFocus: false,
  disabled: false,
  role: 'menu',
  ariaLabel: '',
});

interface INmorphEmit {
  (e: 'update:model-value', value: boolean): void;
  (e: 'open', event: MouseEvent | KeyboardEvent): void;
  (e: 'close'): void;
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}

const emit = defineEmits<INmorphEmit>();

const triggerDOMRef = ref<HTMLElement | null>(null);
const relativeElement = ref<NmorphDomElementType>(null);
const openState = ref(Boolean(props.modelValue));

const isOpen = computed(() => (typeof props.modelValue === 'boolean' ? props.modelValue : openState.value));

watch(
  () => props.modelValue,
  (value) => {
    if (typeof value === 'boolean') openState.value = value;
  }
);

const createPointElement = (x: number, y: number) =>
  ({
    clientWidth: 0,
    getBoundingClientRect: () =>
      ({
        x,
        y,
        width: 0,
        height: 0,
        top: y,
        left: x,
        right: x,
        bottom: y,
        toJSON: () => ({}),
      }) as DOMRect,
  }) as HTMLElement;

const setOpen = (value: boolean) => {
  const wasOpen = isOpen.value;

  openState.value = value;
  emit('update:model-value', value);

  if (wasOpen && !value) emit('close');
};

const close = () => {
  setOpen(false);
};

const openAt = (x: number, y: number, event: MouseEvent | KeyboardEvent) => {
  relativeElement.value = createPointElement(x, y);
  setOpen(true);
  emit('open', event);
};

const contextMenuHandler = (event: MouseEvent) => {
  if (props.disabled || (props.trigger !== 'contextmenu' && props.trigger !== 'both')) return;

  event.preventDefault();
  openAt(event.clientX, event.clientY, event);
};

const clickHandler = (event: MouseEvent) => {
  if (props.disabled || (props.trigger !== 'click' && props.trigger !== 'both') || event.button !== 0) return;

  openAt(event.clientX, event.clientY, event);
};

const keydownHandler = (event: KeyboardEvent) => {
  if (props.disabled || (event.key !== 'ContextMenu' && !(event.shiftKey && event.key === 'F10'))) return;

  const eventTarget = event.target instanceof HTMLElement ? event.target : triggerDOMRef.value;
  const rect = eventTarget?.getBoundingClientRect();

  if (!rect) return;

  event.preventDefault();
  openAt(rect.left, rect.bottom, event);
};

const outsideClickHandler = () => {
  emit('on-outside-click');
  close();
};

const escapeHandler = () => {
  emit('on-escape-keydown');
  close();
};

defineExpose({ close });
</script>

<template>
  <div
    ref="triggerDOMRef"
    class="nmorph-context-menu"
    @click="clickHandler"
    @contextmenu="contextMenuHandler"
    @keydown="keydownHandler"
  >
    <slot />
    <NmorphDropdown
      v-if="relativeElement"
      :open="isOpen"
      :relative-element="relativeElement"
      :placement="props.placement"
      :width="props.width"
      :min-width="props.minWidth"
      :max-width="props.maxWidth"
      :x-offset="props.xOffset"
      :y-offset="props.yOffset"
      :fill-width="props.fillWidth"
      :z-index="props.zIndex"
      :close-on-escape="props.closeOnEscape"
      :trap-focus="props.trapFocus"
      :role="props.role"
      :aria-label="props.ariaLabel"
      @on-outside-click="outsideClickHandler"
      @on-escape-keydown="escapeHandler"
    >
      <slot name="menu" :close="close" />
    </NmorphDropdown>
  </div>
</template>

<style lang="scss">
.nmorph-context-menu {
  display: inline-block;
  max-width: 100%;
}
</style>
