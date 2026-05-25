export type NmorphDrawerPlacementType = 'left' | 'right' | 'top' | 'bottom';

export interface INmorphDrawerProps {
  modelValue?: boolean;
  title?: string;
  placement?: NmorphDrawerPlacementType;
  size?: number | string;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
  contentClass?: string;
}

export interface INmorphDrawerEmit {
  (e: 'on-close'): void;
  (e: 'update:model-value', value: boolean): void;
}
