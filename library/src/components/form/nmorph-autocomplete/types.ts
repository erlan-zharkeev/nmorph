import type { INmorphCommonInputProps } from '@/types';
export interface INmorphAutocompleteListItem {
  value: string;
  [key: string]: unknown;
}

export type NmorphAutocompleteActionCallbackType = (...args: unknown[]) => Promise<unknown>;

export interface INmorphAutocompleteProps extends INmorphCommonInputProps {
  modelValue?: string;
  placeholder?: string;
  clearable?: boolean;
  list: INmorphAutocompleteListItem[];
  actionCallback?: NmorphAutocompleteActionCallbackType;
  zIndex?: number;
  virtual?: boolean;
  virtualItemHeight?: number;
  virtualMaxHeight?: number | string;
  virtualOverscan?: number;
  virtualDynamicHeight?: boolean;
}

export interface INmorphAutocompleteEmit {
  (e: 'update:model-value', value: string): void;
  (e: 'select', value: unknown): void;
}
