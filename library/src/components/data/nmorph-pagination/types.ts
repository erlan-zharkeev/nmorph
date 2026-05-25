import type { NmorphComponentHeight } from '@/types';

export interface INmorphPaginationProps {
  totalElementsQuantity: number;
  modelValue?: number;
  elementsQuantityOnPage?: number;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  maxVisiblePages?: number;
  fastForwardStep?: number;
  height?: keyof typeof NmorphComponentHeight;
}

export interface INmorphPaginationEmit {
  (e: 'update:model-value', currentPage: number): void;
}
