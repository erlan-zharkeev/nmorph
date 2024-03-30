import { NmorphDomElement, NmorphPlacement } from '@/types/common';
import { Ref, ref, nextTick } from 'vue';

interface IUsePlacementPayload {
  initialPlacement: NmorphPlacement;
  targetDomElement: Ref<NmorphDomElement>;
  blockPosition: boolean;
}

export const usePlacement = (data: IUsePlacementPayload) => {
  const { initialPlacement, targetDomElement, blockPosition } = data;
  const placement = ref<NmorphPlacement>(initialPlacement);

  const adjustPlacement = () => {
    nextTick(() => {
      if (targetDomElement.value && !blockPosition) {
        const tooltip = targetDomElement.value.getBoundingClientRect();
        const { x, y, width, height } = tooltip;
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        if (placement.value === 'right' && width < screenWidth - x) {
          placement.value = 'left';
        }
        if (placement.value === 'bottom' && height > screenHeight - y) {
          placement.value = 'top';
        }
        if (placement.value === 'left' && width < screenWidth + x) {
          placement.value = 'right';
        }
        if (placement.value === 'top' && height > screenHeight + y) {
          placement.value = 'bottom';
        }
      }
    });
  };

  return { placement, adjustPlacement };
};
