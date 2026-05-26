import type { INmorphTagItemProps } from './../../types';

export interface INmorphTagItemComponentProps extends INmorphTagItemProps {}

export interface INmorphTagItemEmit {
  (e: 'click', val: string): void;
  (e: 'close', val: string): void;
}
