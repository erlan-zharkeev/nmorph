import { type Component } from 'vue';

export interface INmorphAction {
  icon: Component;
  handler: () => void;
}

export interface INmorphImagePreviewProps {
  modelValue?: boolean;
  alt?: string;
  initialIndex?: number;
  src: string | string[];
  scaleStep?: number;
  minScaleLevel?: number;
  maxScaleLevel?: number;
  zIndex?: number;
  showTrigger?: boolean;
  showNavigationButtons?: boolean;
  showActionBar?: boolean;
  width?: number | string;
  height?: number | string;
  navigationButtonMargin?: number | string;
}

export interface INmorphImagePreviewEmit {
  (e: 'update:model-value', value: boolean): void;
}
