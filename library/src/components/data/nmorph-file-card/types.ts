export interface INmorphFileCardProps {
  name: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  previewSrc?: string;
  downloadHref?: string;
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
