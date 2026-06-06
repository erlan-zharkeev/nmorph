import type { NmorphDomElementType, NmorphElementDesignType, NmorphPlacementType } from '@/types';

export interface INmorphDropdownProps {
  open: boolean;
  relativeElement: NmorphDomElementType;
  placement?: NmorphPlacementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
  zIndex?: number;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
  role?: string;
  ariaLabel?: string;
  contentClass?: string;
  hideShadow?: boolean;
  design?: NmorphElementDesignType;
}

export interface INmorphDropdownEmit {
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}
