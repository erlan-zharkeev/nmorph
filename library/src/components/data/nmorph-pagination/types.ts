import type { NmorphComponentThickness } from '@/types';

export interface INmorphPaginationProps {
  totalElementsQuantity: number;
  modelValue?: number;
  elementsQuantityOnPage?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  maxVisiblePages?: number;
  fastForwardStep?: number;
  thickness?: keyof typeof NmorphComponentThickness;
}

export interface INmorphPaginationEmit {
  (e: 'update:model-value', currentPage: number): void;
}
