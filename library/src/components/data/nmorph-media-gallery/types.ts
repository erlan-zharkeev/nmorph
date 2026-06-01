export type NmorphMediaGalleryFit = 'cover' | 'contain';
export type NmorphMediaGalleryVideoPreload = 'none' | 'metadata' | 'auto';

export interface INmorphMediaGalleryItemBase {
  src: string;
  name?: string;
  size?: number;
  downloadHref?: string;
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
  showTrigger?: boolean;
  showNavigationButtons?: boolean;
  showActionBar?: boolean;
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
