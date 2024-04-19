import { NmorphSortOrderType } from '@/types/common';
import { Ref } from 'vue';

export type NmorphTableSortType = Record<string, NmorphSortOrderType>;

export type CellAlignment = 'left' | 'center' | 'right';
export type NmorphTableDataType<T> = T[];
export interface NmorphTableColumnProps {
  label?: string;
  width?: number;
  alignment?: CellAlignment;
  prop: string;
}

export interface NmorphTableDataInjection {
  rows: Ref<NmorphTableSortType[]>;
  columns: Ref<NmorphTableColumnProps[]>;
}
