import { NmorphSortOrderType } from '@/types';
import { ComputedRef, Ref } from 'vue';

export type NmorphTableSortType = Record<string, NmorphSortOrderType>;

export type NmorphDataTableElRecordType = Record<string, unknown>;

export type NmorphCellAlignmentType = 'left' | 'center' | 'right';

export type NmorphTableDataType = NmorphDataTableElRecordType[];

export interface INmorphTableColumnProps {
  label?: string;
  width?: string;
  alignment?: NmorphCellAlignmentType;
  prop: string;
}

export interface NmorphTableColumnData extends INmorphTableColumnProps {
  id?: number;
}

export interface INmorphTableDataInjection {
  rows: Ref<NmorphDataTableElRecordType[]> | ComputedRef<NmorphDataTableElRecordType[]>;
  columns: Ref<NmorphTableColumnData[]>;
}

export type NmorphTableColumnPropertyInjectionType = string;

export type NmorphTableIdInjectionType = string;
