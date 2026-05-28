export interface INmorphAudioPreviewProps {
  src: string;
  name?: string;
  durationMs?: number;
  width?: number | string;
  compact?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  downloadHref?: string;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
  showDefaultActions?: boolean;
}

export interface INmorphAudioPreviewEmit {
  (e: 'play', val: Event): void;
  (e: 'pause', val: Event): void;
  (e: 'open'): void;
  (e: 'download'): void;
  (e: 'error', val: Event): void;
}
