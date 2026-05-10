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
