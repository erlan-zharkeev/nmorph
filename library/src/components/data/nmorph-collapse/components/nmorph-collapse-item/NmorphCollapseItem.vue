<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import {
  INmorphCollapseItemProps,
  NmorphCollapseDataInjectionType,
  NmorphCollapseUpdateModelInjectionType,
} from '@/components';
import { NmorphComponentHeight, NmorphDomElementType } from '@/types';

interface INmorphProps extends INmorphCollapseItemProps {
  height?: keyof typeof NmorphComponentHeight;
  block?: boolean;
  transitionSpeed?: number | string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'basic',
  title: '',
  disabled: false,
  block: false,
  transitionSpeed: undefined,
});

interface INmorphEmit {
  (e: 'click-item', data: { id: string; isOpen: boolean }): void;
}
const emit = defineEmits<INmorphEmit>();

const isOpen = ref(false);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-collapse-item': [props.disabled && 'disabled', props.block && 'block', isOpen.value && 'is-open'],
  })
);

const titleModifiers = computed(() =>
  useModifiers({
    nmorph: [NmorphComponentHeight[props.height]],
  })
);
const getCssDuration = (value?: number | string) => (typeof value === 'number' ? `${value}ms` : value);
const styles = computed<CSSProperties>(() => ({
  ...(props.transitionSpeed !== undefined && { '--transition-speed': getCssDuration(props.transitionSpeed) }),
}));

const collapseData = inject<NmorphCollapseDataInjectionType>('collapse-data');
const updateModel = inject<NmorphCollapseUpdateModelInjectionType>('update-model');

const collapseItemDOMElContent = ref<NmorphDomElementType>(null);

const contentHeight = ref(0);
let resizeObserver: ResizeObserver | null = null;

const isValueOpen = (value: NmorphCollapseDataInjectionType['value'] | undefined) => {
  if (Array.isArray(value)) return value.includes(props.name);
  return value === props.name;
};

const updateContentHeight = () => {
  contentHeight.value =
    isOpen.value && collapseItemDOMElContent.value ? collapseItemDOMElContent.value.scrollHeight : 0;
};

const updateContentHeightAfterRender = () => nextTick(updateContentHeight);

const clickHandler = () => {
  if (props.disabled || props.block) return;
  isOpen.value = !isOpen.value;
  updateModel?.(props.name, isOpen.value);
  emit('click-item', { id: props.name, isOpen: isOpen.value });
};

onMounted(() => {
  isOpen.value = isValueOpen(collapseData?.value);
  updateContentHeightAfterRender();

  if ('ResizeObserver' in window && collapseItemDOMElContent.value) {
    resizeObserver = new ResizeObserver(updateContentHeight);
    resizeObserver.observe(collapseItemDOMElContent.value);
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});

watch(
  () => collapseData?.value,
  (newValue) => {
    isOpen.value = isValueOpen(newValue);
    updateContentHeightAfterRender();
  },
  { deep: true }
);

watch(isOpen, updateContentHeightAfterRender);
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-collapse-item__title" :class="titleModifiers" @click.stop="clickHandler">
      <slot name="title">
        {{ props.title }}
      </slot>
    </div>
    <div class="nmorph-collapse-item__content" :style="{ height: `${contentHeight}px` }">
      <div ref="collapseItemDOMElContent" class="nmorph-collapse-item__inner-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-collapse-item {
  --transition-speed: 0.2s;

  margin-bottom: var(--indentation-03);

  .nmorph-collapse-item__title {
    display: flex;
    align-items: center;
    padding: var(--indentation-02);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    cursor: pointer;
  }

  .nmorph-collapse-item__content {
    box-sizing: content-box;
    overflow: hidden;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
    transition: height var(--transition-speed) ease-in-out;
  }

  .nmorph-collapse-item__inner-wrapper {
    padding: var(--indentation-03);
  }

  &.nmorph-collapse-item--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-collapse-item__title {
      cursor: not-allowed;
    }
  }

  &.nmorph-collapse-item--block {
    .nmorph-collapse-item__title {
      cursor: default;
    }
  }
}
</style>
