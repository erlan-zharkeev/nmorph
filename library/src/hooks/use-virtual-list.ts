import { computed, nextTick, onMounted, onUnmounted, ref, watch, type Ref } from 'vue';

interface INmorphVirtualListOptions {
  enabled?: Readonly<Ref<boolean>>;
  itemHeight: Readonly<Ref<number>>;
  overscan?: Readonly<Ref<number>>;
}

export const useVirtualList = <T>(items: Readonly<Ref<T[]>>, options: INmorphVirtualListOptions) => {
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  const viewportHeight = ref(0);

  const enabled = computed(() => options.enabled?.value ?? true);
  const overscan = computed(() => Math.max(options.overscan?.value ?? 0, 0));
  const itemHeight = computed(() => Math.max(options.itemHeight.value, 1));
  const totalHeight = computed(() => (enabled.value ? items.value.length * itemHeight.value : 0));

  const refresh = () => {
    const element = containerRef.value;
    if (!element) return;
    scrollTop.value = element.scrollTop;
    viewportHeight.value = element.clientHeight;
  };

  const scrollHandler = () => {
    refresh();
  };

  const startIndex = computed(() => {
    if (!enabled.value) return 0;
    return Math.max(Math.floor(scrollTop.value / itemHeight.value) - overscan.value, 0);
  });

  const endIndex = computed(() => {
    if (!enabled.value) return items.value.length;
    const end = Math.ceil((scrollTop.value + viewportHeight.value) / itemHeight.value) + overscan.value;
    return Math.min(Math.max(end, startIndex.value + overscan.value), items.value.length);
  });

  const offsetTop = computed(() => startIndex.value * itemHeight.value);

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
    const scrollValue = Math.min(Math.max(index, 0) * itemHeight.value, totalHeight.value);
    element.scrollTop = scrollValue;
    refresh();
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
    () => [items.value.length, enabled.value, itemHeight.value],
    () => {
      nextTick(refresh);
    }
  );

  return {
    containerRef,
    endIndex,
    offsetTop,
    refresh,
    scrollHandler,
    scrollToIndex,
    startIndex,
    totalHeight,
    virtualItems,
  };
};
