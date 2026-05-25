import type { INmorphCollapseItemProps } from '@/components';
import type { NmorphComponentHeight } from '@/types';

export interface INmorphCollapseItemComponentProps extends INmorphCollapseItemProps {
  height?: keyof typeof NmorphComponentHeight;
  block?: boolean;
  transitionSpeed?: number | string;
}

export interface INmorphCollapseItemEmit {
  (e: 'click-item', data: { id: string; isOpen: boolean }): void;
}
