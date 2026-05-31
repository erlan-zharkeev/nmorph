export type NmorphMediaGalleryFit = 'cover' | 'contain';
export type NmorphMediaGalleryVideoPreload = 'none' | 'metadata' | 'auto';

export type NmorphMediaGalleryItem =
  | {
      kind: 'image';
      src: string;
      name?: string;
      alt?: string;
    }
  | {
      kind: 'video';
      src: string;
      name?: string;
      poster?: string;
      controls?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      preload?: NmorphMediaGalleryVideoPreload;
    };

export interface INmorphMediaGalleryProps {
  modelValue?: boolean;
  items: NmorphMediaGalleryItem[];
  initialIndex?: number;
  activeIndex?: number;
  zIndex?: number;
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
}
