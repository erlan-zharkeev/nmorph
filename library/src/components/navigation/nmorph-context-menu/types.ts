import type { NmorphPlacementType } from '@/types';
import type { Component } from 'vue';

export type NmorphContextMenuOptionPrimitive = string | number;
export type NmorphContextMenuOptionType = 'item' | 'divider' | 'section';
export type NmorphContextMenuMobileMode = 'dropdown' | 'bottom-sheet';

export interface INmorphContextMenuOption {
  type?: NmorphContextMenuOptionType;
  label?: string | number;
  value?: unknown;
  icon?: Component;
  iconProps?: Record<string, unknown>;
  shortcut?: string;
  description?: string;
  component?: Component;
  componentProps?: Record<string, unknown>;
  disabled?: boolean;
  color?: string;
  closeOnClick?: boolean;
}

export type NmorphContextMenuOption = NmorphContextMenuOptionPrimitive | INmorphContextMenuOption;

export type NmorphContextMenuTrigger = 'contextmenu' | 'click' | 'both' | 'longpress' | 'manual';

export type NmorphContextMenuAnchorType = 'point' | 'element';

export type NmorphContextMenuOpenEvent = MouseEvent | KeyboardEvent | PointerEvent | Event;

export interface INmorphNormalizedContextMenuOption {
  key: string;
  type: NmorphContextMenuOptionType;
  label?: string | number;
  value: unknown;
  icon?: Component;
  iconProps?: Record<string, unknown>;
  shortcut?: string;
  description?: string;
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
  mobileMode?: NmorphContextMenuMobileMode;
}

export interface INmorphContextMenuEmit {
  (e: 'update:model-value', value: boolean): void;
  (e: 'open', event?: NmorphContextMenuOpenEvent): void;
  (e: 'close'): void;
  (e: 'select', option: NmorphContextMenuOption, index: number): void;
  (e: 'on-outside-click'): void;
  (e: 'on-escape-keydown'): void;
}

export interface INmorphContextMenuExpose {
  openAt: (x: number, y: number, event?: NmorphContextMenuOpenEvent) => void;
  openAtElement: (element: HTMLElement, event?: NmorphContextMenuOpenEvent) => void;
  close: () => void;
}

export interface INmorphContextMenuSlots {
  default?: (props: Record<string, never>) => unknown;
  menu?: (props: { close: () => void }) => unknown;
  item?: (props: { option: INmorphNormalizedContextMenuOption; active: boolean; disabled: boolean }) => unknown;
}
