import type { NmorphSortOrderType } from '@/types';

export interface INmorphSortButtonProps {
  value: NmorphSortOrderType;
}

export interface INmorphSortButtonEmit {
  (e: 'sort', val: NmorphSortOrderType): void;
}
