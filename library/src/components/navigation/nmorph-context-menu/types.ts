import type { NmorphPlacementType } from '@/types';
import type { Component } from 'vue';

export type NmorphContextMenuOptionPrimitive = string | number;

export interface INmorphContextMenuOption {
  label?: string | number;
  value?: unknown;
  component?: Component;
  componentProps?: Record<string, unknown>;
  disabled?: boolean;
  color?: string;
  closeOnClick?: boolean;
}

export type NmorphContextMenuOption = NmorphContextMenuOptionPrimitive | INmorphContextMenuOption;

export type NmorphContextMenuTrigger = 'contextmenu' | 'click' | 'both';

export type NmorphContextMenuAnchorType = 'point' | 'element';

export interface INmorphNormalizedContextMenuOption {
  key: string;
  label?: string | number;
  value: unknown;
  component?: Component;
  componentProps?: Record<string, unknown>;
  disabled: boolean;
  color?: string;
  closeOnClick: boolean;
  raw: NmorphContextMenuOption;
}

export interface INmorphContextMenuProps {
  modelValue?: boolean | null;
  options?: NmorphContextMenuOption[];
  trigger?: NmorphContextMenuTrigger;
  placement?: NmorphPlacementType;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  xOffset?: number;
  yOffset?: number;
  fillWidth?: boolean;
  zIndex?: number;
  closeOnEscape?: boolean;
  trapFocus?: boolean;
  disabled?: boolean;
  closeOnScroll?: boolean;
  role?: string;
  ariaLabel?: string;
  hideShadow?: boolean;
}

export interface INmorphContextMenuEmit {
  (e: 'update:model-value', value: boolean): void;
  (e: 'open', event: MouseEvent | KeyboardEvent): void;
  (e: 'close'): void;
  (e: 'select', option: NmorphContextMenuOption, index: number): void;
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}
