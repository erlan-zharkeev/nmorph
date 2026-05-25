import type { INmorphCoords, NmorphDomElementType } from '@/types';

export type NmorphCoordsType = INmorphCoords<number>;

export enum NmorphOverflowProp {
  auto = 'auto',
  hidden = 'hidden',
  scroll = 'scroll',
}

export enum NmorphScrollBehavior {
  auto = 'auto',
  smooth = 'smooth',
  inherit = 'inherit',
  initial = 'initial',
  unset = 'unset',
}

export type NmorphScrollOverflowType = keyof typeof NmorphOverflowProp;

export type NmorphScrollBehaviorType = keyof typeof NmorphScrollBehavior;

export interface INmorphScrollProps {
  height?: string;
  maxHeight?: string;
  modelValue?: NmorphCoordsType;
  scrollYProp?: NmorphScrollOverflowType;
  scrollXProp?: NmorphScrollOverflowType;
  cssScrollBehavior?: NmorphScrollBehaviorType;
  scrollEndDelay?: number;
  updateOnlyOnScrollEnd?: boolean;
  yBarWidthInPx?: number;
  xBarWidthInPx?: number;
  xGapInPx?: number;
  yGapInPx?: number;
}

export interface INmorphScrollExpose {
  scrollDOMContainer: NmorphDomElementType;
  moveTo: (coords: NmorphCoordsType) => void;
}

export interface INmorphScrollEmit {
  (e: 'on-scroll', event: Event): void;
  (e: 'update:model-value', coords: NmorphCoordsType): void;
  (e: 'on-scroll-end'): void;
}
