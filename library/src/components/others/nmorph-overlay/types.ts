export interface INmorphOverlayProps {
  show: boolean;
  transparent?: boolean;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  restoreFocus?: boolean;
}

export interface INmorphOverlayEmit {
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}
