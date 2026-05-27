<script setup lang="ts">
import { usePlacement } from '@/hooks/use-placement';
import { useZIndex } from '@/hooks/use-z-index';
import { NmorphDomElementType } from '@/types';
import { createCssSizeVariables, useModifiers } from '@/utils';
import { computed, onBeforeUnmount, ref, useSlots, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { INmorphTooltipProps, INmorphTooltipSlots } from './types';

const LONG_PRESS_DELAY_IN_MS = 600;

const props = withDefaults(defineProps<INmorphTooltipProps>(), {
  text: '',
  position: 'top',
  forceShow: false,
  forceCoordinate: null,
  disabled: false,
  trigger: 'hover',
  touch: 'click',
  openDelay: 0,
  closeDelay: 0,
  zIndex: undefined,
  width: undefined,
  maxWidth: undefined,
  height: undefined,
});

defineSlots<INmorphTooltipSlots>();

const showTooltip = ref(props.forceShow);
const tooltipDOMRef = ref<NmorphDomElementType>(null);
const slotDOMRef = ref<NmorphDomElementType>(null);
const slots = useSlots();
const openTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const longPressTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const lastPointerType = ref<string>('mouse');
const suppressNextClick = ref(false);
const hasTooltipContent = computed(() => Boolean(props.text || slots.content));
const shouldRenderTooltip = computed(() => showTooltip.value && hasTooltipContent.value && !props.disabled);

const { placement } = usePlacement({
  initialPlacement: props.position,
  contentDOMElement: tooltipDOMRef,
  relativeElement: slotDOMRef,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tooltip': [
      placement.value,
      props.disabled && 'disabled',
      Boolean(props.forceCoordinate?.x) && Boolean(props.forceCoordinate?.y) && 'force-coords',
    ],
  })
);

const clearOpenTimer = () => {
  if (openTimer.value) clearTimeout(openTimer.value);
  openTimer.value = null;
};

const clearCloseTimer = () => {
  if (closeTimer.value) clearTimeout(closeTimer.value);
  closeTimer.value = null;
};

const clearLongPressTimer = () => {
  if (longPressTimer.value) clearTimeout(longPressTimer.value);
  longPressTimer.value = null;
};

const setTooltipOpen = (value: boolean) => {
  clearOpenTimer();
  clearCloseTimer();

  if (props.disabled || !hasTooltipContent.value) {
    showTooltip.value = false;
    return;
  }

  showTooltip.value = value;
};

const open = () => {
  clearCloseTimer();
  if (props.disabled || !hasTooltipContent.value) return;

  if (props.openDelay <= 0) {
    setTooltipOpen(true);
    return;
  }

  clearOpenTimer();
  openTimer.value = setTimeout(() => setTooltipOpen(true), props.openDelay);
};

const close = () => {
  if (props.forceShow) return;
  clearOpenTimer();

  if (props.closeDelay <= 0) {
    setTooltipOpen(false);
    return;
  }

  clearCloseTimer();
  closeTimer.value = setTimeout(() => setTooltipOpen(false), props.closeDelay);
};

const toggle = () => {
  if (showTooltip.value) close();
  else open();
};

const handleMouseEnter = () => {
  if (props.trigger !== 'hover' || lastPointerType.value !== 'mouse') return;
  open();
};

const handleMouseLeave = () => {
  if (props.trigger !== 'hover' || lastPointerType.value !== 'mouse') return;
  close();
};

const handleClick = (event: MouseEvent) => {
  if (suppressNextClick.value) {
    suppressNextClick.value = false;
    event.preventDefault();
    return;
  }

  if (props.disabled || props.trigger === 'manual') return;

  const isTouchPointer = lastPointerType.value === 'touch' || lastPointerType.value === 'pen';

  if (isTouchPointer) {
    if (props.touch !== 'click') return;
    toggle();
    return;
  }

  if (props.trigger === 'click') toggle();
};

const handlePointerDown = (event: PointerEvent) => {
  lastPointerType.value = event.pointerType || 'mouse';

  if (props.disabled || props.touch !== 'longpress') return;
  if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;

  clearLongPressTimer();
  longPressTimer.value = setTimeout(() => {
    suppressNextClick.value = true;
    open();
  }, LONG_PRESS_DELAY_IN_MS);
};

const handlePointerEnd = () => {
  clearLongPressTimer();
};

const rootWidth = computed(() => (props.forceCoordinate ? '100%' : 'auto'));
const zIndex = useZIndex(
  () => showTooltip.value,
  () => props.zIndex
);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-tooltip-width': rootWidth.value,
  '--nmorph-tooltip-z-index': zIndex.value,
  ...createCssSizeVariables({
    '--width': props.width,
    '--max-width': props.maxWidth,
    '--height': props.height,
  }),
}));
const tooltipBody = ref<NmorphDomElementType>(null);

watch(
  () => [props.forceShow, props.disabled],
  ([forceShow, disabled], previousValue) => {
    const previousForceShow = previousValue?.[0] ?? false;

    if (disabled) {
      setTooltipOpen(false);
      return;
    }

    if (forceShow) setTooltipOpen(true);
    else if (previousForceShow) setTooltipOpen(false);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  clearOpenTimer();
  clearCloseTimer();
  clearLongPressTimer();
});

defineExpose({ tooltipBody, open, close, toggle });
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div
      ref="tooltipDOMRef"
      class="nmorph-tooltip__content"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @pointerdown="handlePointerDown"
      @pointerup="handlePointerEnd"
      @pointercancel="handlePointerEnd"
      @pointerleave="handlePointerEnd"
    >
      <div ref="slotDOMRef" class="nmorph-tooltip__trigger">
        <slot />
      </div>
      <template v-if="!props.disabled">
        <Transition v-if="props.forceCoordinate" name="opacity">
          <div
            v-if="shouldRenderTooltip"
            ref="tooltipBody"
            class="nmorph-tooltip__info-content"
            :style="{ left: forceCoordinate?.x, bottom: forceCoordinate?.y }"
          >
            <div class="nmorph-tooltip__shadow-content">
              <div v-if="!props.forceCoordinate" class="nmorph-tooltip__triangle" />
              <span v-if="props.text">{{ text }}</span>
              <slot v-else name="content" />
            </div>
          </div>
        </Transition>
        <Transition v-else name="opacity">
          <div v-if="shouldRenderTooltip" ref="tooltipBody" class="nmorph-tooltip__info-content">
            <div class="nmorph-tooltip__shadow-content">
              <div class="nmorph-tooltip__triangle" />
              <span v-if="props.text">{{ text }}</span>
              <slot v-else name="content" />
            </div>
          </div>
        </Transition>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tooltip {
  --max-width: 120px;

  --width: fit-content;
  --height: fit-content;

  display: inline-block;

  .nmorph-tooltip__content {
    position: relative;
    display: inline-flex;
  }

  .nmorph-tooltip__trigger {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    vertical-align: middle;
  }

  .nmorph-tooltip__info-content {
    position: absolute;
    z-index: var(--nmorph-tooltip-z-index);
    width: var(--width);
    max-width: var(--max-width);
    height: var(--height);
    padding: var(--indentation-03);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 20px var(--nmorph-dark-shade-color);
  }

  span {
    white-space: nowrap;
  }

  .nmorph-tooltip__triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
  }

  &.nmorph-tooltip--top {
    .nmorph-tooltip__info-content {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 100%;
      left: 50%;
      border-width: 8px 8px 0;
      border-color: var(--nmorph-main-color) transparent transparent transparent;
      transform: translateX(-50%);
    }
  }

  &.nmorph-tooltip--right {
    .nmorph-tooltip__info-content {
      top: 50%;
      left: calc(100% + 12px);
      transform: translateY(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 50%;
      right: 100%;
      border-width: 8px 8px 8px 0;
      border-color: transparent var(--nmorph-main-color) transparent transparent;
      transform: translateY(-50%);
    }
  }

  &.nmorph-tooltip--bottom {
    .nmorph-tooltip__info-content {
      top: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
    }

    .nmorph-tooltip__triangle {
      bottom: 100%;
      left: 50%;
      border-width: 0 8px 8px;
      border-color: transparent transparent var(--nmorph-main-color) transparent;
      transform: translateX(-50%);
    }
  }

  &.nmorph-tooltip--left {
    .nmorph-tooltip__info-content {
      top: 50%;
      right: calc(100% + 12px);
      transform: translateY(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 50%;
      left: 100%;
      border-width: 8px 0 8px 8px;
      border-color: transparent transparent transparent var(--nmorph-main-color);
      transform: translateY(-50%);
    }
  }

  &.nmorph-tooltip--force-coords {
    .nmorph-tooltip__info-content {
      transform: none;
    }
  }

  width: var(--nmorph-tooltip-width);
}
</style>
