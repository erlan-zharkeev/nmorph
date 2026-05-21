<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useVirtualList } from '@/hooks';
import { toCssSize, useModifiers } from '@/utils';

type NmorphVirtualListKeyGetter = (item: unknown, index: number) => string | number;

interface INmorphProps {
  items?: unknown[];
  height?: number | string;
  maxHeight?: number | string;
  itemHeight?: number;
  overscan?: number;
  dynamic?: boolean;
  disabled?: boolean;
  itemKey?: string | NmorphVirtualListKeyGetter;
  itemTag?: string;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  items: () => [],
  height: '320px',
  maxHeight: 'none',
  itemHeight: 40,
  overscan: 5,
  dynamic: false,
  disabled: false,
  itemKey: undefined,
  itemTag: 'div',
});

interface INmorphEmit {
  (e: 'on-scroll', event: Event): void;
}

const emit = defineEmits<INmorphEmit>();

const items = computed(() => props.items);
const enabled = computed(() => !props.disabled);
const itemHeight = computed(() => props.itemHeight);
const overscan = computed(() => props.overscan);
const dynamic = computed(() => props.dynamic);

const virtualList = useVirtualList(items, {
  enabled,
  itemHeight,
  overscan,
  dynamic,
});
const containerRef = virtualList.containerRef;

const modifiers = computed(() =>
  useModifiers({
    'nmorph-virtual-list': [props.disabled && 'disabled', props.dynamic && 'dynamic'],
  })
);

const styles = computed<CSSProperties>(() => ({
  '--nmorph-virtual-list-height': toCssSize(props.height),
  '--nmorph-virtual-list-max-height': toCssSize(props.maxHeight),
  '--nmorph-virtual-list-item-height': `${props.itemHeight}px`,
}));

const contentStyle = computed<CSSProperties>(() => ({
  transform: enabled.value ? `translateY(${virtualList.offsetTop.value}px)` : undefined,
}));

const spacerStyle = computed<CSSProperties>(() => ({
  height: enabled.value ? `${virtualList.totalHeight.value}px` : undefined,
}));

const renderedItems = computed(() => virtualList.virtualItems.value);

const getItemKey = (item: unknown, index: number) => {
  if (typeof props.itemKey === 'function') return props.itemKey(item, index);
  if (typeof props.itemKey === 'string' && item && typeof item === 'object') {
    const value = (item as Record<string, unknown>)[props.itemKey];
    return value === undefined ? index : String(value);
  }
  return index;
};

const scrollHandler = (event: Event) => {
  virtualList.scrollHandler();
  emit('on-scroll', event);
};

const setItemRef = (element: Element | null, index: number) => {
  virtualList.measureElement(index, element);
};

defineExpose({
  containerRef,
  refresh: virtualList.refresh,
  scrollToIndex: virtualList.scrollToIndex,
});
</script>

<template>
  <div ref="containerRef" :class="modifiers" :style="styles" @scroll="scrollHandler">
    <div v-if="props.items.length" class="nmorph-virtual-list__spacer" :style="spacerStyle">
      <div class="nmorph-virtual-list__content" :style="contentStyle">
        <component
          :is="props.itemTag"
          v-for="virtualItem in renderedItems"
          :key="getItemKey(virtualItem.item, virtualItem.index)"
          :ref="(element) => setItemRef(element as Element | null, virtualItem.index)"
          class="nmorph-virtual-list__item"
        >
          <slot :item="virtualItem.item" :index="virtualItem.index">
            {{ virtualItem.item }}
          </slot>
        </component>
      </div>
    </div>
    <div v-else class="nmorph-virtual-list__empty">
      <slot name="empty" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-virtual-list {
  position: relative;
  box-sizing: border-box;
  min-width: 0;
  height: var(--nmorph-virtual-list-height);
  max-height: var(--nmorph-virtual-list-max-height);
  overflow: auto;
  color: var(--nmorph-text-color);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  &--disabled {
    height: auto;
    overflow: visible;
  }

  .nmorph-virtual-list__spacer {
    position: relative;
    min-height: 100%;
  }

  .nmorph-virtual-list__content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }

  &--disabled .nmorph-virtual-list__content {
    position: static;
    transform: none;
  }

  .nmorph-virtual-list__item {
    box-sizing: border-box;
    min-height: var(--nmorph-virtual-list-item-height);
  }

  .nmorph-virtual-list__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    padding: var(--indentation-04);
    color: var(--nmorph-semi-contrast-text-color);
  }
}
</style>
