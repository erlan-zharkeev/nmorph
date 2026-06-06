export type NmorphMediaTileFit = 'cover' | 'contain';

export interface INmorphMediaTileProps {
  src?: string;
  srcObject?: MediaStream | null;
  fit?: NmorphMediaTileFit;
  mirrored?: boolean;
  muted?: boolean;
  autoplay?: boolean;
  playsinline?: boolean;
  name?: string;
  avatarSrc?: string;
  loading?: boolean;
  showFallback?: boolean;
  micMuted?: boolean;
  videoOff?: boolean;
  screenSharing?: boolean;
  speaking?: boolean;
  selected?: boolean;
  pinned?: boolean;
  error?: boolean;
  errorText?: string;
}

export interface INmorphMediaTileExpose {
  videoRef: HTMLVideoElement | null;
}
