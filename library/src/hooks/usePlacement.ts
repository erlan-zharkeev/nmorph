import { NmorphCoords, NmorphDomElement, NmorphPlacement } from '@/types/common';
import { Ref, ref, nextTick } from 'vue';

interface IUsePlacementPayload {
  initialPlacement: NmorphPlacement;
  dropdownDOMElement: Ref<NmorphDomElement>;
  blockPosition: boolean;
  relativeElement: NmorphDomElement;
  yOffset?: number;
  xOffset?: number;
}

export const usePlacement = (data: IUsePlacementPayload) => {
  const { initialPlacement, relativeElement, dropdownDOMElement, yOffset = 0, xOffset = 0, blockPosition } = data;
  const placement = ref<NmorphPlacement>(initialPlacement);
  const placementCoords = ref<NmorphCoords<string>>({ x: '0px', y: '0px' });

  const adjustPlacement = () => {
    nextTick(() => {
      if (!dropdownDOMElement.value || !relativeElement || blockPosition) return;
      const dropdownEl = dropdownDOMElement.value.getBoundingClientRect();
      const dropdownElWidth = dropdownEl.width;
      const dropdownElHeight = dropdownEl.height;

      const relativeEl = relativeElement?.getBoundingClientRect();
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

  adjustPlacement();

  return { placement, adjustPlacement, placementCoords };
};
