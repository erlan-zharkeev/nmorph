<script setup lang="ts">
import { INmorphA11yProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { NmorphCoordsType, NmorphOverflowProp, NmorphScrollBehavior } from '@/components';
import { useA11yProps } from '@/main';

interface INmorphProps extends INmorphA11yProps {
  height?: string;
  maxHeight?: string;
  modelValue?: NmorphCoordsType;
  scrollYProp?: keyof typeof NmorphOverflowProp;
  scrollXProp?: keyof typeof NmorphOverflowProp;
  cssScrollBehavior?: keyof typeof NmorphScrollBehavior;
  scrollEndDelay?: number;
  updateOnlyOnScrollEnd?: boolean;
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
});

const overflowY = computed(() => props.scrollYProp);
const overflowX = computed(() => props.scrollXProp);

const paddingRight = computed(() => (props.scrollYProp !== 'hidden' ? '--scrollbar-width' : '0'));
const paddingBottom = computed(() => (props.scrollXProp !== 'hidden' ? '--scrollbar-height' : '0'));

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

const modifiers = computed(() =>
  useModifiers({
    'nmorph-scroll': [],
  })
);

const scrollDOMContainer = ref<NmorphDomElementType>(null);

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
});

watch(
  () => props.modelValue,
  (newCoords) => {
    moveTo(newCoords);
  },
  { deep: true, immediate: true }
);

const scrollBehavior = computed(() => props.cssScrollBehavior);
const scrollHeight = computed(() => props.height);
const maxHeight = computed(() => props.maxHeight);

const a11yProps = useA11yProps(props);

defineExpose({ scrollDOMContainer, moveTo });
</script>

<template>
  <div ref="scrollDOMContainer" :class="modifiers" v-bind="a11yProps" @scroll="scrollHandler">
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-scroll {
  --height: v-bind(scrollHeight);
  --max-height: v-bind(maxHeight);

  --scrollbar-width: 8px;
  --scrollbar-height: 8px;

  --padding-right: var(--scrollbar-width);
  --padding-bottom: var(--scrollbar-height);

  height: var(--height);
  max-height: var(--max-height);
  padding-right: v-bind(paddingRight);
  padding-bottom: v-bind(paddingBottom);
  overflow: v-bind(overflowX) v-bind(overflowY);
  scroll-behavior: v-bind(scrollBehavior);

  &::-webkit-scrollbar {
    width: var(--scrollbar-height);
    height: var(--scrollbar-height);
    background-color: transparent;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    @include nmorph-inset;

    border-radius: var(--border-radius-40);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--nmorph-accent-color);
    border-radius: var(--border-radius-40);
  }
}
</style>
