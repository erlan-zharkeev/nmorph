import type { INmorphCoords, NmorphDomElementType } from '@/types';

export type NmorphCoordsType = INmorphCoords<number>;

export const NmorphOverflowProp = {
  auto: 'auto',
  hidden: 'hidden',
  scroll: 'scroll',
} as const;

export type NmorphOverflowProp = keyof typeof NmorphOverflowProp;

export const NmorphScrollBehavior = {
  auto: 'auto',
  smooth: 'smooth',
  inherit: 'inherit',
  initial: 'initial',
  unset: 'unset',
} as const;

export type NmorphScrollBehavior = keyof typeof NmorphScrollBehavior;

export type NmorphScrollOverflowType = NmorphOverflowProp;

export type NmorphScrollBehaviorType = NmorphScrollBehavior;

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
