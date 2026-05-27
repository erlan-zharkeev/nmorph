import type { INmorphTagItemProps, INmorphTagItemSlots } from './../../types';

export interface INmorphTagItemComponentProps extends INmorphTagItemProps {}

export type { INmorphTagItemSlots };

export interface INmorphTagItemEmit {
  (e: 'click', val: string): void;
  (e: 'close', val: string): void;
}
