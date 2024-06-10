export interface INmorphAutocompleteListItem {
  value: string;
  [key: string]: unknown;
}

export type NmorphAutocompleteActionCallbackType = (...args: unknown[]) => Promise<unknown>;
