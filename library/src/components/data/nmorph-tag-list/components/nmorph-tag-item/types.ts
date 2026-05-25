import type { INmorphTagItemProps } from './../../types';

export interface INmorphTagItemComponentProps extends INmorphTagItemProps {}

export interface INmorphTagItemEmit {
  (e: 'close', val: string): void;
}
