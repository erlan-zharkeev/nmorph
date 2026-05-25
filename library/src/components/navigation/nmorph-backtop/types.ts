import type { NmorphElementDesignType } from '@/types';

export interface INmorphBacktopProps {
  right?: number;
  bottom?: number;
  visibilityHeight?: number;
  design?: NmorphElementDesignType;
  zIndex?: number;
  teleportTo?: string;
  teleportDisabled?: boolean;
}

export interface INmorphBacktopEmit {
  (e: 'click'): void;
}

export type NmorphBacktopScrollContainer = HTMLElement | Window;
