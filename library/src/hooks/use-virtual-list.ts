import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

interface INmorphVirtualListOptions {
  enabled?: Readonly<Ref<boolean>>;
  itemHeight: Readonly<Ref<number>>;
  overscan?: Readonly<Ref<number>>;
  dynamic?: Readonly<Ref<boolean>>;
}

export const useVirtualList = <T>(items: Readonly<Ref<T[]>>, options: INmorphVirtualListOptions) => {
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  const viewportHeight = ref(0);

  const enabled = computed(() => options.enabled?.value ?? true);
  const overscan = computed(() => Math.max(options.overscan?.value ?? 0, 0));
  const dynamic = computed(() => options.dynamic?.value ?? false);
  const itemHeight = computed(() => Math.max(options.itemHeight.value, 1));
  const measuredHeights = ref<Record<number, number>>({});

  const getItemHeight = (index: number) => {
    if (!dynamic.value) return itemHeight.value;
    return measuredHeights.value[index] || itemHeight.value;
  };

  const itemOffsets = computed(() => {
    const offsets: number[] = [];
    let total = 0;

    for (let index = 0; index < items.value.length; index++) {
      offsets[index] = total;
      total += getItemHeight(index);
    }

    return { offsets, total };
  });

  const totalHeight = computed(() => {
    if (!enabled.value) return 0;
    if (dynamic.value) return itemOffsets.value.total;
    return items.value.length * itemHeight.value;
  });

  const refresh = () => {
    const element = containerRef.value;
    if (!element) return;
    const maxScrollTop = Math.max(totalHeight.value - element.clientHeight, 0);
    if (element.scrollTop > maxScrollTop) element.scrollTop = maxScrollTop;
    scrollTop.value = element.scrollTop;
    viewportHeight.value = element.clientHeight;
  };

  const scrollHandler = () => {
    refresh();
  };

  const startIndex = computed(() => {
    if (!enabled.value) return 0;
    if (dynamic.value) {
      const index = itemOffsets.value.offsets.findIndex((offset, currentIndex) => {
        return offset + getItemHeight(currentIndex) >= scrollTop.value;
      });
      return Math.max(index === -1 ? 0 : index - overscan.value, 0);
    }
    return Math.max(Math.floor(scrollTop.value / itemHeight.value) - overscan.value, 0);
  });

  const endIndex = computed(() => {
    if (!enabled.value) return items.value.length;
    if (dynamic.value) {
      const viewportEnd = scrollTop.value + viewportHeight.value;
      let index = startIndex.value;
      while (index < items.value.length && itemOffsets.value.offsets[index] <= viewportEnd) {
        index++;
      }
      return Math.min(index + overscan.value, items.value.length);
    }
    const end = Math.ceil((scrollTop.value + viewportHeight.value) / itemHeight.value) + overscan.value;
    return Math.min(Math.max(end, startIndex.value + overscan.value), items.value.length);
  });

  const offsetTop = computed(() =>
    dynamic.value ? itemOffsets.value.offsets[startIndex.value] || 0 : startIndex.value * itemHeight.value
  );

  const virtualItems = computed(() => {
    if (!enabled.value) {
      return items.value.map((item, index) => ({ item, index }));
    }

    return items.value.slice(startIndex.value, endIndex.value).map((item, index) => ({
      item,
      index: startIndex.value + index,
    }));
  });

  const scrollToIndex = (index: number) => {
    const element = containerRef.value;
    if (!element || !enabled.value) return;
    const normalizedIndex = Math.min(Math.max(index, 0), Math.max(items.value.length - 1, 0));
    const scrollValue = dynamic.value
      ? itemOffsets.value.offsets[normalizedIndex] || 0
      : normalizedIndex * itemHeight.value;
    element.scrollTop = scrollValue;
    refresh();
  };

  const measureElement = (index: number, element?: Element | null) => {
    if (!dynamic.value || !element) return;
    const height = Math.ceil(element.getBoundingClientRect().height || (element as HTMLElement).offsetHeight);
    if (!height || measuredHeights.value[index] === height) return;
    measuredHeights.value = { ...measuredHeights.value, [index]: height };
    nextTick(refresh);
  };

  const resizeHandler = () => {
    refresh();
  };

  onMounted(() => {
    nextTick(refresh);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeHandler);
    }
  });

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', resizeHandler);
    }
  });

  watch(
    () => [items.value.length, enabled.value, itemHeight.value, dynamic.value],
    () => {
      nextTick(refresh);
    }
  );

  return {
    containerRef,
    endIndex,
    offsetTop,
    refresh,
    measureElement,
    scrollHandler,
    scrollToIndex,
    startIndex,
    totalHeight,
    viewportHeight,
    virtualItems,
  };
};
