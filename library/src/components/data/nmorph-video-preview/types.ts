export type NmorphVideoPreviewFit = 'cover' | 'contain';
export type NmorphVideoPreviewSurface = 'card' | 'soft' | 'plain';

export interface INmorphVideoPreviewProps {
  src: string;
  poster?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
  durationMs?: number;
  surface?: NmorphVideoPreviewSurface;
  embedded?: boolean;
  showMeta?: boolean;
  compact?: boolean;
  controls?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  fit?: NmorphVideoPreviewFit;
  downloadHref?: string;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
  showDefaultActions?: boolean;
}

export interface INmorphVideoPreviewEmit {
  (e: 'play', val: Event): void;
  (e: 'pause', val: Event): void;
  (e: 'open'): void;
  (e: 'download'): void;
  (e: 'error', val: Event): void;
}
