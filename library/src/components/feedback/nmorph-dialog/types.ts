export interface INmorphDialogProps {
  modelValue?: boolean;
  title?: string;
  width?: string;
  maxWidth?: string;
  maxHeight?: string;
  openDelay?: number;
  closeDelay?: number;
  showClose?: boolean;
  zIndex?: number;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

export interface INmorphDialogEmit {
  (e: 'on-close'): void;
  (e: 'update:model-value', value: boolean): void;
}
