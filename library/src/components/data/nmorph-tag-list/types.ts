import { NmorphComponentHeight, NmorphElementDesignType } from '@/types';

export interface INmorphTagItemProps {
  value: string;
  text?: string;
  removable?: boolean;
  height?: keyof typeof NmorphComponentHeight;
  design?: NmorphElementDesignType;
  color?: string;
}

export type NmorphTagListSlotItem<TItem extends INmorphTagItemProps = INmorphTagItemProps> = TItem & {
  design: NmorphElementDesignType;
  color?: string;
};

export interface INmorphTagItemSlots {
  default?: (props: Record<string, never>) => unknown;
}

export interface INmorphTagListSlots<TItem extends INmorphTagItemProps = INmorphTagItemProps> {
  item?: (props: { item: NmorphTagListSlotItem<TItem> }) => unknown;
}

export interface INmorphTagListProps<TItem extends INmorphTagItemProps = INmorphTagItemProps> {
  modelValue: TItem[];
  selectedValue?: string | null;
  design?: NmorphElementDesignType;
  color?: string;
}

export interface INmorphTagListEmit<TItem extends INmorphTagItemProps = INmorphTagItemProps> {
  (e: 'click', val: string): void;
  (e: 'close', val: string): void;
  (e: 'update:model-value', val: TItem[]): void;
  (e: 'update:selected-value', val: string): void;
  (e: 'update:selectedValue', val: string): void;
}
