import { Ref } from 'vue';
import type { NmorphElementDesignType } from '@/types';

export interface INmorphCarouselInjection {
  data: Ref<string[]>;
  carouselId: string;
  hasLoopClones: Ref<boolean>;
}

export interface INmorphCarouselProps {
  design?: NmorphElementDesignType;
  loop?: boolean;
}

export interface INmorphCarouselEmit {
  (e: 'change', value: number): void;
}
