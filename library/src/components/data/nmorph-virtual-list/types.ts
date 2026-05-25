export interface INmorphVirtualListSlotItem<T = unknown> {
  item: T;
  index: number;
}

export type NmorphVirtualListKeyGetter = (item: unknown, index: number) => string | number;

export interface INmorphVirtualListProps {
  items?: unknown[];
  height?: number | string;
  maxHeight?: number | string;
  itemHeight?: number;
  overscan?: number;
  dynamic?: boolean;
  disabled?: boolean;
  itemKey?: string | NmorphVirtualListKeyGetter;
  itemTag?: string;
}

export interface INmorphVirtualListEmit {
  (e: 'on-scroll', event: Event): void;
}
