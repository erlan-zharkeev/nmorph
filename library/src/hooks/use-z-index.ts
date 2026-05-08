import { computed, inject, ref, watch, WatchSource } from 'vue';
import { INmorphInstance } from '@/types';

export const useZIndex = (open: WatchSource<boolean>, zIndex: () => number | undefined) => {
  const nmorph = inject<INmorphInstance | undefined>('nmorph');
  const dynamicZIndex = ref(nmorph?.zIndex.current.value ?? 1000);

  watch(
    open,
    (isOpen) => {
      if (isOpen && zIndex() === undefined) dynamicZIndex.value = nmorph?.zIndex.next() ?? dynamicZIndex.value + 1;
    },
    { immediate: true }
  );

  return computed(() => zIndex() ?? dynamicZIndex.value);
};
