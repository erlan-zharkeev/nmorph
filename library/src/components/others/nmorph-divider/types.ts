import type { NmorphElementDesignType } from '@/types';

export type NmorphDirectionType = 'vertical' | 'horizontal';

export interface INmorphDividerProps {
  direction?: NmorphDirectionType;
  design?: NmorphElementDesignType;
}
