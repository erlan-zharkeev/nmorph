import { NmorphComponentHeight, NmorphElementDesignType } from '@/types';

export interface INmorphTagItemProps {
  value: string;
  text: string;
  removable?: boolean;
  height?: keyof typeof NmorphComponentHeight;
  design?: NmorphElementDesignType;
}

export interface INmorphTagListProps {
  modelValue: INmorphTagItemProps[];
  design?: NmorphElementDesignType;
}

export interface INmorphTagListEmit {
  (e: 'close', val: string): void;
  (e: 'update:model-value', val: INmorphTagItemProps[]): void;
}
