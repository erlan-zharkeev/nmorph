import { type Component } from 'vue';

export interface INmorphAction {
  icon: Component;
  handler: () => void;
}

export type NmorphImagePreviewTriggerView = 'single' | 'gallery';
export type NmorphImagePreviewFit = 'cover' | 'contain';

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
  previewWidth?: number | string;
  previewHeight?: number | string;
  radius?: number | string;
  fit?: NmorphImagePreviewFit;
  navigationButtonMargin?: number | string;
  triggerView?: NmorphImagePreviewTriggerView;
  triggerLimit?: number;
  triggerGap?: number | string;
}

export interface INmorphImagePreviewEmit {
  (e: 'update:model-value', value: boolean): void;
}
