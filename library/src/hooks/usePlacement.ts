import { NmorphCoords, NmorphDomElement, NmorphPlacement } from '@/types/common';
import { Ref, ref, nextTick, onMounted } from 'vue';

interface IUsePlacementPayload {
  initialPlacement: NmorphPlacement;
  contentDOMElement: Ref<NmorphDomElement>;
  relativeElement: NmorphDomElement | Ref<NmorphDomElement>;
  yOffset?: number;
  xOffset?: number;
}

export const usePlacement = (data: IUsePlacementPayload) => {
  const { initialPlacement, relativeElement, contentDOMElement, yOffset = 0, xOffset = 0 } = data;
  const placement = ref<NmorphPlacement>(initialPlacement);
  const placementCoords = ref<NmorphCoords<string>>({ x: '0px', y: '0px' });

  onMounted(() => {
    adjustPlacement();
  });

  const adjustPlacement = () => {
    nextTick(() => {
      if (!contentDOMElement.value || !relativeElement) {
        console.warn('There is no relative element or content DOM element');
        return;
      }

      const dropdownEl = contentDOMElement.value.getBoundingClientRect();
      const dropdownElWidth = dropdownEl.width;
      const dropdownElHeight = dropdownEl.height;

      const actualRelativeEl = 'value' in relativeElement ? relativeElement.value : relativeElement;

      if (!actualRelativeEl) {
        console.warn('Relative element is not an HTMLElement');
        return;
      }

      const relativeEl = (actualRelativeEl as HTMLElement).getBoundingClientRect();
      const { x, y } = relativeEl;

      const relativeElWidth = relativeEl.width;
      const relativeElHeight = relativeEl.height;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (placement.value === 'top' && y - dropdownElHeight < 0) {
        placement.value = 'bottom';
      }

      if (placement.value === 'bottom' && y + relativeElHeight + dropdownElHeight > screenHeight) {
        placement.value = 'top';
      }

      if (placement.value === 'left' && x - dropdownElWidth < 0) {
        placement.value = 'right';
      }

      if (placement.value === 'right' && x + relativeElWidth + dropdownElWidth > screenWidth) {
        placement.value = 'left';
      }

      if (placement.value === 'top') {
        placementCoords.value = { x: `${x + xOffset}px`, y: `${y + yOffset}px` };
      }

      if (placement.value === 'bottom') {
        placementCoords.value = { x: `${x + xOffset}px`, y: `${y + relativeElHeight + yOffset}px` };
      }

      if (placement.value === 'right') {
        placementCoords.value = { x: `${x + xOffset}px`, y: `${y + yOffset}px` };
      }

      if (placement.value === 'left') {
        placementCoords.value = { x: `${x + relativeElWidth + xOffset}px`, y: `${y + yOffset}px` };
      }
    });
  };

  return { placement, placementCoords };
};
