<script setup lang="ts">
import { INmorphInstance, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, inject, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { type INmorphScrollProps, type NmorphCoordsType } from './types';

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

const scrollDOMContainer = ref<NmorphDomElementType>(null);

const overflowY = computed(() => props.scrollYProp);
const overflowX = computed(() => props.scrollXProp);

const hasVerticalScroll = ref(false);
const hasHorizontalScroll = ref(false);

const updateScrollableState = () => {
  const element = scrollDOMContainer.value;

  if (!element) {
    hasVerticalScroll.value = false;
    hasHorizontalScroll.value = false;
    return;
  }

  hasVerticalScroll.value = element.scrollHeight > element.clientHeight;
  hasHorizontalScroll.value = element.scrollWidth > element.clientWidth;
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

const nmorph = inject('nmorph') as INmorphInstance;
let scrollEndTimeout: ReturnType<typeof setTimeout> | undefined;

interface INmorphEmit {
  (e: 'on-scroll', event: Event): void;
  (e: 'update:model-value', coords: NmorphCoordsType): void;
  (e: 'on-scroll-end'): void;
}

const emit = defineEmits<INmorphEmit>();

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
});

const show = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-scroll': [],
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
    ref="scrollDOMContainer"
    :class="modifiers"
    :style="{
      '--bar-width': barWidth,
      '--bar-height': barHeight,
      boxSizing: 'border-box',
      minWidth: '0',
      minHeight: '0',
      height: scrollHeight,
      maxHeight,
      paddingRight,
      paddingBottom,
      overflowX,
      overflowY,
      scrollBehavior,
    }"
    @scroll="scrollHandler"
    @mouseenter="mouseEnterHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-scroll {
  --thumb-color: var(--nmorph-scroll-thumb-color, var(--nmorph-text-color));

  color-scheme: var(--nmorph-scroll-color-scheme, light);
  scrollbar-color: var(--thumb-color) transparent;
  scrollbar-width: thin;
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
