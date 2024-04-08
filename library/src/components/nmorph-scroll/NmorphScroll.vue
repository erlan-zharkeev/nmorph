<script setup lang="ts">
import { NmorphCoords, NmorphDomElement } from '@/types/common';
import { getModifiers } from '@/utils';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

type Coords = NmorphCoords<number>;

enum NmorphOverflowProp {
  auto = 'auto',
  hidden = 'hidden',
  scroll = 'scroll',
}

interface IProps {
  modelValue?: Coords;
  scrollYProp?: keyof typeof NmorphOverflowProp;
  scrollXProp?: keyof typeof NmorphOverflowProp;
  scrollEndDelay?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: () => ({
    x: 0,
    y: 0,
  }),
  scrollYProp: 'auto',
  scrollXProp: 'auto',
  scrollEndDelay: 50,
});

const overflowY = computed(() => props.scrollYProp);
const overflowX = computed(() => props.scrollXProp);

const paddingRight = computed(() => (props.scrollYProp !== 'hidden' ? '--scrollbar-width' : '0'));
const paddingBottom = computed(() => (props.scrollXProp !== 'hidden' ? '--scrollbar-height' : '0'));

let scrollEndTimeout: NodeJS.Timeout;

interface IEmit {
  (e: 'on-scroll', event: Event): void;
  (e: 'update:modelValue', coords: Coords): void;
  (e: 'on-scroll-end'): void;
}

const emit = defineEmits<IEmit>();

const handleScrollEnd = () => {
  emit('on-scroll-end');
};

const scrollHandler = (event: Event) => {
  emit('on-scroll', event);

  if (!scrollDOMContainer.value) return;

  const x = scrollDOMContainer.value.scrollLeft;
  const y = scrollDOMContainer.value.scrollTop;
  emit('update:modelValue', { x, y });
  if (scrollEndTimeout !== undefined) {
    clearTimeout(scrollEndTimeout);
  }
  scrollEndTimeout = setTimeout(() => {
    handleScrollEnd();
  }, props.scrollEndDelay);
};

onUnmounted(() => {
  if (scrollEndTimeout !== undefined) {
    clearTimeout(scrollEndTimeout);
  }
});

const modifiers = computed(() =>
  getModifiers({
    'nmorph-scroll': [],
  })
);

const scrollDOMContainer = ref<NmorphDomElement>(null);

const scrollTo = (coords: Coords) => {
  const { x, y } = coords;
  scrollDOMContainer.value?.scrollTo({
    left: x,
    top: y,
    behavior: 'smooth',
  });
};

onMounted(() => {
  scrollTo(props.modelValue);
});

watch(
  () => props.modelValue,
  (newCoords) => {
    scrollTo(newCoords);
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div ref="scrollDOMContainer" :class="modifiers" @wheel.passive="scrollHandler">
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-scroll {
  --scrollbar-width: 8px;
  --scrollbar-height: 8px;

  --padding-right: var(--scrollbar-width);
  --padding-bottom: var(--scrollbar-height);

  padding-right: v-bind(paddingRight);
  padding-bottom: v-bind(paddingBottom);

  overflow-y: v-bind(overflowY);
  overflow-x: v-bind(overflowX);

  &::-webkit-scrollbar {
    width: var(--scrollbar-width);
    height: var(--scrollbar-height);
    background-color: transparent;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    @include nmorph-inset;
    border-radius: var(--border-radius-40);
  }

  &::-webkit-scrollbar-thumb {
    @include nmorph-outset;
    border-radius: var(--border-radius-40);
  }
}
</style>
