export interface NmorphAutocompleteListItem {
  value: string;
  [key: string]: unknown;
}

export type NmorphAutocompleteActionCallback = (...args: unknown[]) => Promise<unknown>;
