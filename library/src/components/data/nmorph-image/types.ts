import type { INmorphImage, NmorphElementDesignType } from '@/types';

export interface INmorphImageProps extends INmorphImage {
  design?: NmorphElementDesignType;
  /** @deprecated Image loading renders a loader icon. Use the loading slot for custom loading content. */
  loadingText?: string;
  loadFailedText?: string;
  frameBorder?: number;
}

export interface INmorphImageEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}
