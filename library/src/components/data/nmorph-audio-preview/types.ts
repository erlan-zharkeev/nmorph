export type NmorphAudioPreviewSurface = 'card' | 'soft' | 'plain';

export interface INmorphAudioPreviewProps {
  src: string;
  name?: string;
  durationMs?: number;
  width?: number | string;
  surface?: NmorphAudioPreviewSurface;
  embedded?: boolean;
  showIcon?: boolean;
  showHeader?: boolean;
  compact?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  downloadHref?: string;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
  showPlaybackButton?: boolean;
  showDefaultActions?: boolean;
}

export interface INmorphAudioPreviewEmit {
  (e: 'play', val: Event): void;
  (e: 'pause', val: Event): void;
  (e: 'open'): void;
  (e: 'download'): void;
  (e: 'error', val: Event): void;
}
