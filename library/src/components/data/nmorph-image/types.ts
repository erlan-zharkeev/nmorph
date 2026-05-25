import type { INmorphImage } from '@/types';

export interface INmorphImageProps extends INmorphImage {
  loadingText?: string;
  loadFailedText?: string;
  frameBorder?: number;
}

export interface INmorphImageEmit {
  (e: 'error', event: Event): void;
  (e: 'load', event: Event): void;
}
