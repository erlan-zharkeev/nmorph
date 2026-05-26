import { INmorphCoords, INmorphInstance, NmorphDomElementType, NmorphPlacementType } from '@/types';
import { Ref, ref, nextTick, onMounted, inject, watch, onUnmounted, unref } from 'vue';

type TNmorphMaybeRef<T> = T | Ref<T>;

const VIEWPORT_MARGIN_IN_PX = 4;

interface INmorphUsePlacementPayload {
  initialPlacement: TNmorphMaybeRef<NmorphPlacementType>;
  contentDOMElement: Ref<NmorphDomElementType>;
  relativeElement: NmorphDomElementType | Ref<NmorphDomElementType>;
  yOffset?: TNmorphMaybeRef<number | undefined>;
  xOffset?: TNmorphMaybeRef<number | undefined>;
  enabled?: TNmorphMaybeRef<boolean | undefined>;
}

export const usePlacement = (data: INmorphUsePlacementPayload) => {
  const { initialPlacement, relativeElement, contentDOMElement, yOffset = 0, xOffset = 0, enabled } = data;
  const placement = ref<NmorphPlacementType>(unref(initialPlacement));
  const placementCoords = ref<INmorphCoords<string>>({ x: '0px', y: '0px' });
  const placementReady = ref(false);
  const nmorph = inject<INmorphInstance | undefined>('nmorph');
  const scrollListenerOptions: AddEventListenerOptions = { passive: true, capture: true };
  let mutationObserver: MutationObserver | null = null;

  watch(
    () => nmorph?.browser,
    () => {
      adjustPlacement();
    },
    { deep: true }
  );

  onMounted(() => {
    adjustPlacement();
    addScrollListener();
    window.addEventListener('resize', adjustPlacement, { passive: true });
    mutationObserver = new MutationObserver(() => {
      checkForCoordinateChanges();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    checkForCoordinateChanges();
  });

  onUnmounted(() => {
    removeScrollListener();
    window.removeEventListener('resize', adjustPlacement);
    mutationObserver?.disconnect();
  });

  watch(
    () => [unref(initialPlacement), unref(relativeElement), unref(xOffset), unref(yOffset), unref(enabled)],
    () => {
      adjustPlacement();
    },
    { flush: 'post' }
  );

  const checkForCoordinateChanges = () => {
    nextTick(() => {
      if (contentDOMElement.value) adjustPlacement();
    });
  };

  const isEnabled = () => enabled === undefined || unref(enabled) !== false;

  const parsePlacement = (value: NmorphPlacementType) => {
    const [side, align] = value.split('-');

    return {
      side,
      align: align || 'start',
      hasAlign: Boolean(align),
    } as const;
  };

  const getPlacementName = (side: string, align: string, hasAlign: boolean) =>
    (hasAlign ? `${side}-${align}` : side) as NmorphPlacementType;

  const getRelativeElement = () => unref(relativeElement);

  const clampToViewport = (value: number, size: number, viewportSize: number) => {
    const min = VIEWPORT_MARGIN_IN_PX;
    const max = Math.max(viewportSize - size - VIEWPORT_MARGIN_IN_PX, min);

    return Math.min(Math.max(value, min), max);
  };

  const getResolvedSide = (
    side: string,
    x: number,
    y: number,
    relativeElWidth: number,
    relativeElHeight: number,
    dropdownElWidth: number,
    dropdownElHeight: number
  ) => {
    if (side === 'top' && y - dropdownElHeight < 0) {
      return 'bottom';
    }

    if (side === 'bottom' && y + relativeElHeight + dropdownElHeight > window.innerHeight) {
      return 'top';
    }

    if (side === 'left' && x - dropdownElWidth < 0) {
      return 'right';
    }

    if (side === 'right' && x + relativeElWidth + dropdownElWidth > window.innerWidth) {
      return 'left';
    }

    return side;
  };

  const addScrollListener = () => {
    window.addEventListener('scroll', adjustPlacement, scrollListenerOptions);
  };

  const removeScrollListener = () => {
    window.removeEventListener('scroll', adjustPlacement, scrollListenerOptions);
  };

  const adjustPlacement = () => {
    nextTick(() => {
      if (typeof window === 'undefined') return;

      if (!isEnabled()) {
        placementReady.value = false;
        return;
      }

      const actualRelativeEl = getRelativeElement();

      if (!contentDOMElement.value || !actualRelativeEl) {
        placementReady.value = false;
        return;
      }

      const dropdownEl = contentDOMElement.value.getBoundingClientRect();
      const dropdownElWidth = dropdownEl.width;
      const dropdownElHeight = dropdownEl.height;
      const relativeEl = (actualRelativeEl as HTMLElement).getBoundingClientRect();
      const { x, y } = relativeEl;
      const relativeElWidth = relativeEl.width;
      const relativeElHeight = relativeEl.height;
      const xOffsetValue = unref(xOffset) || 0;
      const yOffsetValue = unref(yOffset) || 0;
      const parsedPlacement = parsePlacement(unref(initialPlacement));
      const side = getResolvedSide(
        parsedPlacement.side,
        x,
        y,
        relativeElWidth,
        relativeElHeight,
        dropdownElWidth,
        dropdownElHeight
      );

      let nextX = x;
      let nextY = y;

      if (side === 'top' || side === 'bottom') {
        const alignMap = {
          start: x,
          center: x + relativeElWidth / 2 - dropdownElWidth / 2,
          end: x + relativeElWidth - dropdownElWidth,
        };

        nextX = alignMap[parsedPlacement.align as keyof typeof alignMap] ?? alignMap.start;
        nextY = side === 'top' ? y - dropdownElHeight : y + relativeElHeight;
      }

      if (side === 'left' || side === 'right') {
        const alignMap = {
          start: y,
          center: y + relativeElHeight / 2 - dropdownElHeight / 2,
          end: y + relativeElHeight - dropdownElHeight,
        };

        nextX = side === 'left' ? x - dropdownElWidth : x + relativeElWidth;
        nextY = alignMap[parsedPlacement.align as keyof typeof alignMap] ?? alignMap.start;
      }

      const nextXWithOffset = nextX + xOffsetValue;
      const nextYWithOffset = nextY + yOffsetValue;
      const resolvedX = clampToViewport(nextXWithOffset, dropdownElWidth, window.innerWidth);
      const resolvedY = clampToViewport(nextYWithOffset, dropdownElHeight, window.innerHeight);

      placement.value = getPlacementName(side, parsedPlacement.align, parsedPlacement.hasAlign);
      placementCoords.value = { x: `${resolvedX}px`, y: `${resolvedY}px` };
      placementReady.value = true;

      if (typeof requestAnimationFrame !== 'function') return;

      requestAnimationFrame(() => {
        const nextRelativeEl = getRelativeElement();

        if (!contentDOMElement.value || !nextRelativeEl || !isEnabled()) return;

        const currentContent = contentDOMElement.value.getBoundingClientRect();

        if (currentContent.width !== dropdownElWidth || currentContent.height !== dropdownElHeight) {
          adjustPlacement();
        }
      });
    });
  };

  return { placement, placementCoords, placementReady, adjustPlacement };
};
