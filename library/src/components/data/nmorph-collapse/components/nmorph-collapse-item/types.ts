import type { INmorphCollapseItemProps } from '@/components';
import type { NmorphComponentThickness } from '@/types';

export interface INmorphCollapseItemComponentProps extends INmorphCollapseItemProps {
  thickness?: keyof typeof NmorphComponentThickness;
  block?: boolean;
  transitionSpeed?: number | string;
}

export interface INmorphCollapseItemEmit {
  (e: 'click-item', data: { id: string; isOpen: boolean }): void;
}
