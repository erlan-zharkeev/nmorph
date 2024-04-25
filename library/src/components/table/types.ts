import { NmorphSortOrderType } from '@/types/common';
import { Ref } from 'vue';

export type NmorphTableSortType = Record<string, NmorphSortOrderType>;

export type NmorphDataTableElRecord = Record<string, unknown>;

export type CellAlignment = 'left' | 'center' | 'right';

export type NmorphTableDataType = NmorphDataTableElRecord[];

export interface NmorphTableColumnProps {
  label?: string;
  width?: string;
  alignment?: CellAlignment;
  prop: string;
}

export interface NmorphTableColumnData extends NmorphTableColumnProps {
  id?: number;
}

export interface NmorphTableDataInjection {
  rows: Ref<NmorphDataTableElRecord[]>;
  columns: Ref<NmorphTableColumnData[]>;
}
