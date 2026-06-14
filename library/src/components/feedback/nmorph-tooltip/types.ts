import type { INmorphCoords, NmorphPlacementType } from '@/types';
import type { HTMLAttributes } from 'vue';

export type NmorphTooltipTrigger = 'hover' | 'click' | 'manual';
export type NmorphTooltipTouchBehavior = 'disable' | 'click' | 'longpress';

export interface INmorphTooltipProps {
  text?: string;
  position?: NmorphPlacementType;
  forceShow?: boolean;
  forceCoordinate?: Partial<INmorphCoords<string>> | null;
  disabled?: boolean;
  trigger?: NmorphTooltipTrigger;
  touch?: NmorphTooltipTouchBehavior;
  openDelay?: number;
  closeDelay?: number;
  zIndex?: number;
  teleportTo?: string | HTMLElement;
  disabledTeleport?: boolean;
  width?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  contentClass?: HTMLAttributes['class'];
  hideTriangle?: boolean;
}

export interface INmorphTooltipSlots {
  default?: (props: Record<string, never>) => unknown;
  content?: (props: Record<string, never>) => unknown;
}

export interface INmorphTooltipExpose {
  tooltipBody: HTMLElement | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
