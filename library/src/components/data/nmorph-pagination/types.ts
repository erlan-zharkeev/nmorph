import type { NmorphComponentThickness } from '@/types';

export interface INmorphPaginationProps {
  totalElementsQuantity: number;
  modelValue?: number;
  elementsQuantityOnPage?: number;
  disabled?: boolean;
  loading?: boolean;
  hideOnSinglePage?: boolean;
  maxVisiblePages?: number;
  fastForwardStep?: number;
  thickness?: keyof typeof NmorphComponentThickness;
  fixedContainer?: boolean;
  width?: number | string;
  minWidth?: number | string;
}

export interface INmorphPaginationEmit {
  (e: 'update:model-value', currentPage: number): void;
}
