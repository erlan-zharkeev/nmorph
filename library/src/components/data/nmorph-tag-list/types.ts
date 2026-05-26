import { NmorphComponentHeight, NmorphElementDesignType } from '@/types';

export interface INmorphTagItemProps {
  value: string;
  text: string;
  removable?: boolean;
  height?: keyof typeof NmorphComponentHeight;
  design?: NmorphElementDesignType;
  color?: string;
}

export interface INmorphTagListProps {
  modelValue: INmorphTagItemProps[];
  selectedValue?: string | null;
  design?: NmorphElementDesignType;
  color?: string;
}

export interface INmorphTagListEmit {
  (e: 'click', val: string): void;
  (e: 'close', val: string): void;
  (e: 'update:model-value', val: INmorphTagItemProps[]): void;
  (e: 'update:selected-value', val: string): void;
  (e: 'update:selectedValue', val: string): void;
}
