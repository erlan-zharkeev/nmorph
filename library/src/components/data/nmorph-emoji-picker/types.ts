export type NmorphEmojiPickerGroupKey = string | number;

export interface INmorphEmojiPickerSkinToneVariant {
  emoji: string;
  annotation?: string;
  tags?: string[];
  tone?: string;
}

export interface INmorphEmojiPickerItem {
  emoji: string;
  annotation?: string;
  tags?: string[];
  group?: NmorphEmojiPickerGroupKey;
  groupLabel?: string;
  order?: number;
  skinToneVariants?: Array<string | INmorphEmojiPickerSkinToneVariant>;
}

export interface INmorphEmojiPickerGroup {
  group: NmorphEmojiPickerGroupKey;
  label?: string;
  emojis: Array<string | INmorphEmojiPickerItem>;
  order?: number;
}

export type NmorphEmojiPickerDataSource =
  | Array<string | INmorphEmojiPickerItem | INmorphEmojiPickerGroup>
  | Record<string, Array<string | INmorphEmojiPickerItem> | INmorphEmojiPickerGroup | unknown>;

export interface INmorphEmojiPickerI18n {
  searchPlaceholder?: string;
  searchLabel?: string;
  quickLabel?: string;
  expandLabel?: string;
  collapseLabel?: string;
  noResults?: string;
  categoryLabel?: string;
  resultsLabel?: string;
  categories?: Record<string, string>;
  categoryLabels?: Record<string, string>;
}

export interface INmorphEmojiPickerProps {
  language?: string;
  dataSource?: NmorphEmojiPickerDataSource;
  i18n?: INmorphEmojiPickerI18n;
  quickList?: string[];
  initialExpanded?: boolean;
  width?: number | string;
  height?: number | string;
  columns?: number;
  cellSize?: number | string;
  toggleSize?: number | string;
  scrollbarSize?: number | string;
  hoverBackground?: string;
  activeBackground?: string;
  focusRing?: string;
  disabled?: boolean;
  hideShadow?: boolean;
}

export interface INmorphEmojiPickerEmit {
  (e: 'select', val: string): void;
  (e: 'expand'): void;
  (e: 'collapse'): void;
}
