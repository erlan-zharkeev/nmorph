<script setup lang="ts">
import { INmorphInstance, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import type { StyleValue } from 'vue';
import { type INmorphScrollProps, type NmorphCoordsType } from './types';
import type { INmorphScrollEmit } from './types';

type NmorphScrollAxis = 'x' | 'y';

interface INmorphScrollMetrics {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
  scrollLeft: number;
  scrollTop: number;
}

interface INmorphScrollDragState {
  axis: NmorphScrollAxis;
  pointerStart: number;
  scrollStart: number;
  trackSize: number;
  thumbSize: number;
  maxScroll: number;
}

const props = withDefaults(defineProps<INmorphScrollProps>(), {
  height: '100%',
  maxHeight: 'none',
  modelValue: () => ({
    x: 0,
    y: 0,
  }),
  scrollYProp: 'auto',
  scrollXProp: 'auto',
  cssScrollBehavior: 'smooth',
  scrollEndDelay: 50,
  updateOnlyOnScrollEnd: false,
  yBarWidthInPx: 6,
  xBarWidthInPx: 6,
  yGapInPx: 0,
  xGapInPx: 0,
});

const scrollRoot = ref<NmorphDomElementType>(null);
const scrollDOMContainer = ref<NmorphDomElementType>(null);

const overflowY = computed(() => props.scrollYProp);
const overflowX = computed(() => props.scrollXProp);

const hasVerticalScroll = ref(false);
const hasHorizontalScroll = ref(false);
const metrics = ref<INmorphScrollMetrics>({
  clientWidth: 0,
  clientHeight: 0,
  scrollWidth: 0,
  scrollHeight: 0,
  scrollLeft: 0,
  scrollTop: 0,
});
const isDragging = ref(false);
let resizeObserver: ResizeObserver | undefined;
let dragState: INmorphScrollDragState | undefined;
let previousBodyUserSelect = '';

const updateScrollableState = () => {
  const element = scrollDOMContainer.value;

  if (!element) {
    hasVerticalScroll.value = false;
    hasHorizontalScroll.value = false;
    metrics.value = {
      clientWidth: 0,
      clientHeight: 0,
      scrollWidth: 0,
      scrollHeight: 0,
      scrollLeft: 0,
      scrollTop: 0,
    };
    return;
  }

  const nextMetrics = {
    clientWidth: element.clientWidth,
    clientHeight: element.clientHeight,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop,
  };

  metrics.value = nextMetrics;
  hasVerticalScroll.value = nextMetrics.scrollHeight > nextMetrics.clientHeight;
  hasHorizontalScroll.value = nextMetrics.scrollWidth > nextMetrics.clientWidth;
};

const paddingRightCandidate = computed(() => props.yBarWidthInPx + props.yGapInPx);
const paddingBottomCandidate = computed(() => props.xBarWidthInPx + props.xGapInPx);

const paddingRight = computed(() =>
  props.scrollYProp === 'hidden' || !hasVerticalScroll.value ? '0' : `${paddingRightCandidate.value}px`
);

const paddingBottom = computed(() =>
  props.scrollXProp === 'hidden' || !hasHorizontalScroll.value ? '0' : `${paddingBottomCandidate.value}px`
);

const barWidth = computed(() => `${props.yBarWidthInPx}px`);
const barHeight = computed(() => `${props.xBarWidthInPx}px`);
const verticalBarBottom = computed(() => (visibleHorizontalBar.value ? barHeight.value : '0px'));
const horizontalBarRight = computed(() => (visibleVerticalBar.value ? barWidth.value : '0px'));

const nmorph = inject('nmorph') as INmorphInstance;
let scrollEndTimeout: ReturnType<typeof setTimeout> | undefined;

const emit = defineEmits<INmorphScrollEmit>();

const updateValue = () => {
  const element = scrollDOMContainer.value;

  if (!element) return;

  const x = Math.trunc(element.scrollLeft);
  const y = Math.trunc(element.scrollTop);
  emit('update:model-value', { x, y });
};

const handleScrollEnd = () => {
  emit('on-scroll-end');
};

const scrollHandler = (event: Event) => {
  updateScrollableState();
  emit('on-scroll', event);

  if (!scrollDOMContainer.value) return;

  if (!props.updateOnlyOnScrollEnd) updateValue();

  if (scrollEndTimeout !== undefined) {
    clearTimeout(scrollEndTimeout);
  }

  scrollEndTimeout = setTimeout(() => {
    if (props.updateOnlyOnScrollEnd) updateValue();
    handleScrollEnd();
  }, props.scrollEndDelay);
};

onUnmounted(() => {
  if (scrollEndTimeout !== undefined) {
    clearTimeout(scrollEndTimeout);
  }

  resizeObserver?.disconnect();
  stopThumbDrag();
});

const show = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-scroll': {
      'show-bars': show.value || isDragging.value,
      dragging: isDragging.value,
    },
  })
);

const moveTo = (coords: NmorphCoordsType) => {
  const { x, y } = coords;
  scrollDOMContainer.value?.scrollTo({
    left: x,
    top: y,
    behavior: 'smooth',
  });
};

onMounted(() => {
  moveTo(props.modelValue);
  nextTick(updateScrollableState);

  if (typeof ResizeObserver !== 'undefined' && scrollDOMContainer.value) {
    resizeObserver = new ResizeObserver(() => {
      updateScrollableState();
    });
    resizeObserver.observe(scrollDOMContainer.value);
  }
});

watch(
  () => props.modelValue,
  (newCoords) => {
    moveTo(newCoords);
  },
  { deep: true, immediate: true }
);

watch(
  () => nmorph?.browser.dimensions,
  () => {
    nextTick(updateScrollableState);
  },
  { deep: true, immediate: true }
);

const scrollBehavior = computed(() => props.cssScrollBehavior);
const scrollHeight = computed(() => props.height);
const maxHeight = computed(() => props.maxHeight);
const rootStyle = computed<StyleValue>(() => ({
  '--bar-width': barWidth.value,
  '--bar-height': barHeight.value,
  boxSizing: 'border-box',
  minWidth: '0',
  minHeight: '0',
  height: scrollHeight.value,
  maxHeight: maxHeight.value,
}));
const viewportStyle = computed<StyleValue>(() => ({
  paddingRight: paddingRight.value,
  paddingBottom: paddingBottom.value,
  overflowX: overflowX.value,
  overflowY: overflowY.value,
  scrollBehavior: scrollBehavior.value,
}));

const visibleVerticalBar = computed(() => props.scrollYProp !== 'hidden' && hasVerticalScroll.value);
const visibleHorizontalBar = computed(() => props.scrollXProp !== 'hidden' && hasHorizontalScroll.value);

const verticalTrackSize = computed(() =>
  Math.max(0, metrics.value.clientHeight - (visibleHorizontalBar.value ? props.xBarWidthInPx : 0))
);
const horizontalTrackSize = computed(() =>
  Math.max(0, metrics.value.clientWidth - (visibleVerticalBar.value ? props.yBarWidthInPx : 0))
);

const getTrackSize = (axis: NmorphScrollAxis) => (axis === 'y' ? verticalTrackSize.value : horizontalTrackSize.value);
const getClientSize = (axis: NmorphScrollAxis) =>
  axis === 'y' ? metrics.value.clientHeight : metrics.value.clientWidth;
const getScrollSize = (axis: NmorphScrollAxis) =>
  axis === 'y' ? metrics.value.scrollHeight : metrics.value.scrollWidth;
const getScrollPosition = (axis: NmorphScrollAxis) =>
  axis === 'y' ? metrics.value.scrollTop : metrics.value.scrollLeft;
const getMinThumbSize = (axis: NmorphScrollAxis) =>
  Math.min(getTrackSize(axis), Math.max(18, axis === 'y' ? props.yBarWidthInPx * 3 : props.xBarWidthInPx * 3));
const getMaxScroll = (axis: NmorphScrollAxis) => Math.max(0, getScrollSize(axis) - getClientSize(axis));

const getThumbSize = (axis: NmorphScrollAxis) => {
  const trackSize = getTrackSize(axis);
  const scrollSize = getScrollSize(axis);
  const clientSize = getClientSize(axis);

  if (trackSize <= 0 || scrollSize <= clientSize) return 0;

  return Math.min(trackSize, Math.max(getMinThumbSize(axis), (clientSize / scrollSize) * trackSize));
};

const getThumbOffset = (axis: NmorphScrollAxis) => {
  const maxScroll = getMaxScroll(axis);
  const trackTravel = Math.max(0, getTrackSize(axis) - getThumbSize(axis));

  if (!maxScroll || !trackTravel) return 0;

  return (getScrollPosition(axis) / maxScroll) * trackTravel;
};

const verticalThumbStyle = computed(() => ({
  height: `${getThumbSize('y')}px`,
  transform: `translate3d(0, ${getThumbOffset('y')}px, 0)`,
}));
const horizontalThumbStyle = computed(() => ({
  width: `${getThumbSize('x')}px`,
  transform: `translate3d(${getThumbOffset('x')}px, 0, 0)`,
}));

const setScrollPosition = (axis: NmorphScrollAxis, value: number) => {
  const element = scrollDOMContainer.value;

  if (!element) return;

  const nextValue = Math.max(0, Math.min(getMaxScroll(axis), value));

  if (axis === 'y') element.scrollTop = nextValue;
  else element.scrollLeft = nextValue;

  updateScrollableState();
};

const stopThumbDrag = () => {
  if (!dragState) return;

  window.removeEventListener('pointermove', thumbPointerMoveHandler);
  window.removeEventListener('pointerup', thumbPointerUpHandler);
  window.removeEventListener('pointercancel', thumbPointerUpHandler);
  dragState = undefined;
  isDragging.value = false;

  if (document.body) {
    document.body.style.userSelect = previousBodyUserSelect;
  }
};

const thumbPointerMoveHandler = (event: PointerEvent) => {
  if (!dragState) return;

  const pointerPosition = dragState.axis === 'y' ? event.clientY : event.clientX;
  const pointerDelta = pointerPosition - dragState.pointerStart;
  const trackTravel = Math.max(1, dragState.trackSize - dragState.thumbSize);
  const scrollDelta = (pointerDelta / trackTravel) * dragState.maxScroll;

  setScrollPosition(dragState.axis, dragState.scrollStart + scrollDelta);
};

const thumbPointerUpHandler = () => {
  stopThumbDrag();
};

const thumbPointerDownHandler = (axis: NmorphScrollAxis, event: PointerEvent) => {
  event.preventDefault();
  event.stopPropagation();

  const trackSize = getTrackSize(axis);
  const thumbSize = getThumbSize(axis);
  const maxScroll = getMaxScroll(axis);

  if (!trackSize || !thumbSize || !maxScroll) return;

  dragState = {
    axis,
    pointerStart: axis === 'y' ? event.clientY : event.clientX,
    scrollStart: getScrollPosition(axis),
    trackSize,
    thumbSize,
    maxScroll,
  };
  isDragging.value = true;
  previousBodyUserSelect = document.body?.style.userSelect ?? '';

  if (document.body) {
    document.body.style.userSelect = 'none';
  }

  window.addEventListener('pointermove', thumbPointerMoveHandler);
  window.addEventListener('pointerup', thumbPointerUpHandler);
  window.addEventListener('pointercancel', thumbPointerUpHandler);
};

const trackPointerDownHandler = (axis: NmorphScrollAxis, event: PointerEvent) => {
  if ((event.target as HTMLElement).closest('.nmorph-scroll__thumb')) return;

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const pointerPosition = axis === 'y' ? event.clientY - rect.top : event.clientX - rect.left;
  const trackTravel = Math.max(1, getTrackSize(axis) - getThumbSize(axis));
  const nextScrollPosition = ((pointerPosition - getThumbSize(axis) / 2) / trackTravel) * getMaxScroll(axis);

  setScrollPosition(axis, nextScrollPosition);
};

defineExpose({ scrollDOMContainer, moveTo });

const mouseEnterHandler = () => {
  show.value = true;
};

const mouseLeaveHandler = () => {
  show.value = false;
};
</script>

<template>
  <div
    ref="scrollRoot"
    :class="modifiers"
    :style="rootStyle"
    @mouseenter="mouseEnterHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <div ref="scrollDOMContainer" class="nmorph-scroll__viewport" :style="viewportStyle" @scroll="scrollHandler">
      <slot />
    </div>
    <div
      v-if="visibleVerticalBar"
      class="nmorph-scroll__bar nmorph-scroll__bar--vertical"
      :style="{ bottom: verticalBarBottom }"
      @pointerdown="trackPointerDownHandler('y', $event)"
    >
      <div
        class="nmorph-scroll__thumb nmorph-scroll__thumb--vertical"
        :style="verticalThumbStyle"
        @pointerdown="thumbPointerDownHandler('y', $event)"
      />
    </div>
    <div
      v-if="visibleHorizontalBar"
      class="nmorph-scroll__bar nmorph-scroll__bar--horizontal"
      :style="{ right: horizontalBarRight }"
      @pointerdown="trackPointerDownHandler('x', $event)"
    >
      <div
        class="nmorph-scroll__thumb nmorph-scroll__thumb--horizontal"
        :style="horizontalThumbStyle"
        @pointerdown="thumbPointerDownHandler('x', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-scroll {
  --thumb-color: var(--nmorph-scroll-thumb-color, var(--nmorph-text-color));

  position: relative;
  overflow: hidden;
  color-scheme: var(--nmorph-scroll-color-scheme, light);

  &__viewport {
    display: inherit;
    flex-direction: inherit;
    flex-wrap: inherit;
    grid-auto-flow: inherit;
    grid-template-columns: inherit;
    grid-template-rows: inherit;
    gap: inherit;
    justify-content: inherit;
    align-content: inherit;
    align-items: inherit;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color-scheme: inherit;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  &__viewport::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    background: transparent;
  }

  &__bar {
    position: absolute;
    z-index: 1;
    background: transparent;
    border-radius: var(--border-radius-40);
    box-shadow: var(--nmorph-shadow-inset);
    opacity: 0.78;
    transition:
      opacity ease-in-out 0.16s,
      background-color ease-in-out 0.16s;
    touch-action: none;
  }

  &__bar--vertical {
    top: 0;
    right: 0;
    width: var(--bar-width);
  }

  &__bar--horizontal {
    right: 0;
    bottom: 0;
    left: 0;
    height: var(--bar-height);
  }

  &__thumb {
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--thumb-color);
    border-radius: var(--border-radius-40);
    cursor: pointer;
    transition: background-color ease-in-out 0.16s;
    touch-action: none;
  }

  &__thumb--vertical {
    width: 100%;
  }

  &__thumb--horizontal {
    height: 100%;
  }

  &--show-bars &__bar,
  &__bar:hover {
    opacity: 1;
  }

  &--dragging &__thumb {
    cursor: grabbing;
  }
}

.nmorph-scroll::-webkit-scrollbar {
  width: var(--bar-width);
  height: var(--bar-height);
  background-color: transparent;
  cursor: pointer;
  transition: width ease-in-out 0.2s;
}

.nmorph-scroll::-webkit-scrollbar-button,
.nmorph-scroll::-webkit-scrollbar-button:single-button,
.nmorph-scroll::-webkit-scrollbar-button:double-button,
.nmorph-scroll::-webkit-scrollbar-button:vertical:start:decrement,
.nmorph-scroll::-webkit-scrollbar-button:vertical:end:increment,
.nmorph-scroll::-webkit-scrollbar-button:horizontal:start:decrement,
.nmorph-scroll::-webkit-scrollbar-button:horizontal:end:increment {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  max-width: 0 !important;
  height: 0 !important;
  min-height: 0 !important;
  max-height: 0 !important;
  background: transparent !important;
  background-image: none !important;
  border: 0 !important;
  appearance: none;
}

.nmorph-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: var(--border-radius-40);
  box-shadow: var(--nmorph-shadow-inset);
}

.nmorph-scroll::-webkit-scrollbar-thumb {
  background-color: var(--thumb-color);
  border-radius: var(--border-radius-40);
}

.nmorph-scroll::-webkit-scrollbar-corner {
  background-color: transparent;
}
</style>
