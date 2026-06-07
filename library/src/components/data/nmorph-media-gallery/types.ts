import type { NmorphCSSProperties } from '@/types';

export type NmorphMediaGalleryFit = 'cover' | 'contain';
export type NmorphMediaGalleryVideoPreload = 'none' | 'metadata' | 'auto';
export type NmorphMediaGalleryTriggerItemClass = string | string[] | Record<string, boolean | undefined>;
export type NmorphMediaGalleryTriggerItemStyle = NmorphCSSProperties;

export interface INmorphMediaGalleryItemBase {
  src: string;
  name?: string;
  size?: number;
  downloadHref?: string;
  aspectRatio?: number;
  itemClass?: NmorphMediaGalleryTriggerItemClass;
  itemStyle?: NmorphMediaGalleryTriggerItemStyle;
}

export type NmorphMediaGalleryItem =
  | (INmorphMediaGalleryItemBase & {
      kind: 'image';
      alt?: string;
    })
  | (INmorphMediaGalleryItemBase & {
      kind: 'video';
      poster?: string;
      controls?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      preload?: NmorphMediaGalleryVideoPreload;
    });

export interface INmorphMediaGalleryProps {
  modelValue?: boolean;
  items: NmorphMediaGalleryItem[];
  initialIndex?: number;
  activeIndex?: number;
  zIndex?: number;
  height?: number | string;
  previewWidth?: number | string;
  previewHeight?: number | string;
  showTrigger?: boolean;
  showTriggerName?: boolean;
  showTriggerSize?: boolean;
  showTriggerActions?: boolean;
  showTriggerPreviewAction?: boolean;
  showTriggerFullscreenAction?: boolean;
  showTriggerDownloadAction?: boolean;
  showTriggerPlayButton?: boolean;
  triggerImageFit?: NmorphMediaGalleryFit;
  triggerVideoFit?: NmorphMediaGalleryFit;
  triggerItemClass?: (item: NmorphMediaGalleryItem, index: number) => NmorphMediaGalleryTriggerItemClass | undefined;
  triggerItemStyle?: (item: NmorphMediaGalleryItem, index: number) => NmorphMediaGalleryTriggerItemStyle | undefined;
  showNavigationButtons?: boolean;
  showActionBar?: boolean;
  showFileName?: boolean;
  showFileSize?: boolean;
  showFileActions?: boolean;
  showPlaybackButton?: boolean;
  imageFit?: NmorphMediaGalleryFit;
  videoFit?: NmorphMediaGalleryFit;
}

export interface INmorphMediaGalleryEmit {
  (e: 'update:model-value', value: boolean): void;
  (e: 'update:active-index', value: number): void;
  (e: 'close'): void;
  (e: 'change', item: NmorphMediaGalleryItem, index: number): void;
  (e: 'download', item: NmorphMediaGalleryItem, index: number): void;
  (e: 'fullscreen', item: NmorphMediaGalleryItem, index: number): void;
}
