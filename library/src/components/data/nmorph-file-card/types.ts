export type NmorphFileCardSurface = 'card' | 'soft' | 'plain';
export type NmorphFileCardMediaPreview = 'none' | 'audio' | 'video';

export interface INmorphFileCardProps {
  name: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  previewSrc?: string;
  downloadHref?: string;
  mediaPreview?: NmorphFileCardMediaPreview;
  surface?: NmorphFileCardSurface;
  showExtensionBadge?: boolean;
  iconSurface?: boolean;
  compact?: boolean;
  loading?: boolean;
  error?: boolean;
  errorText?: string;
  showDefaultActions?: boolean;
}

export interface INmorphFileCardEmit {
  (e: 'open'): void;
  (e: 'download'): void;
  (e: 'error'): void;
}
