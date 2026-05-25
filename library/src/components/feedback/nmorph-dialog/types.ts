export interface INmorphDialogProps {
  modelValue?: boolean;
  title?: string;
  width?: string;
  maxHeight?: string;
  openDelay?: number;
  closeDelay?: number;
  /**
   * @deprecated Use `closeOnOverlay` instead.
   */
  closeOnClickModal?: boolean;
  showClose?: boolean;
  zIndex?: number;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}

export interface INmorphDialogEmit {
  (e: 'on-close'): void;
  (e: 'update:model-value', value: boolean): void;
}
