import { Ref } from 'vue';

export interface INmorphCarouselInjection {
  data: Ref<string[]>;
  carouselId: string;
}

export interface INmorphCarouselProps {
  loop?: boolean;
}

export interface INmorphCarouselEmit {
  (e: 'change', value: number): void;
}
