<script setup lang="ts">
import { INmorphA11yProps, INmorphInstance, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import { NmorphCoordsType, NmorphOverflowProp, NmorphScrollBehavior } from '@/components';
import { useA11yProps } from '@/main';
import { nextTick } from 'vue';

interface INmorphProps extends INmorphA11yProps {
  height?: string;
  maxHeight?: string;
  modelValue?: NmorphCoordsType;
  scrollYProp?: keyof typeof NmorphOverflowProp;
  scrollXProp?: keyof typeof NmorphOverflowProp;
  cssScrollBehavior?: keyof typeof NmorphScrollBehavior;
  scrollEndDelay?: number;
  updateOnlyOnScrollEnd?: boolean;
  yBarWidthInPx?: number;
  xBarWidthInPx?: number;
  xGapInPx?: number;
  yGapInPx?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'auto',
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
  yGapInPx: 4,
  xGapInPx: 4,
});

const scrollDOMContainer = ref<NmorphDomElementType>(null);

const overflowY = computed(() => props.scrollYProp);
const overflowX = computed(() => props.scrollXProp);

const hasVerticalScroll = ref(false);
const hasHorizontalScroll = ref(false);

const updateScrollableState = () => {
  hasVerticalScroll.value = scrollDOMContainer.value.scrollHeight > scrollDOMContainer.value.clientHeight;
  hasHorizontalScroll.value = scrollDOMContainer.value.scrollWidth > scrollDOMContainer.value.clientWidth;
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
let scrollEndTimeout: NodeJS.Timeout;

interface INmorphEmit {
  (e: 'on-scroll', event: Event): void;
  (e: 'update:modelValue', coords: NmorphCoordsType): void;
  (e: 'on-scroll-end'): void;
}

const emit = defineEmits<INmorphEmit>();

const updateValue = () => {
  const x = Math.trunc(scrollDOMContainer.value.scrollLeft);
  const y = Math.trunc(scrollDOMContainer.value.scrollTop);
  emit('update:modelValue', { x, y });
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

const a11yProps = useA11yProps(props);

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
    v-bind="a11yProps"
    @scroll="scrollHandler"
    @mouseenter="mouseEnterHandler"
    @mouseleave="mouseLeaveHandler"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-scroll {
  --thumb-color: var(--nmorph-accent-color);

  height: v-bind(scrollHeight);
  max-height: v-bind(maxHeight);
  padding-right: v-bind(paddingRight);
  padding-bottom: v-bind(paddingBottom);
  overflow: v-bind(overflowX) v-bind(overflowY);
  scroll-behavior: v-bind(scrollBehavior);

  &::-webkit-scrollbar {
    width: v-bind(barWidth);
    height: v-bind(barHeight);
    background-color: transparent;
    cursor: pointer;
    transition: width ease-in-out 0.2s;
  }

  &::-webkit-scrollbar-track {
    @include nmorph-inset;

    border-radius: var(--border-radius-40);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--thumb-color);
    border-radius: var(--border-radius-40);
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
}
</style>
