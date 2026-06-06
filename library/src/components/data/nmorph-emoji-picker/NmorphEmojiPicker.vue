<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  NmorphCheckbox,
  NmorphIcon,
  NmorphIconBurger,
  NmorphIconSearch,
  NmorphIconSmile,
  NmorphScroll,
  NmorphTextInput,
} from '@/components';
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import type {
  INmorphEmojiPickerEmit,
  INmorphEmojiPickerI18n,
  INmorphEmojiPickerProps,
  INmorphEmojiPickerSkinToneVariant,
} from './types';

interface INmorphEmojiPickerNormalizedItem {
  key: string;
  emoji: string;
  annotation: string;
  tags: string[];
  groupKey: string;
  groupLabel: string;
  groupSort: number;
  order: number;
  skinToneVariants: INmorphEmojiPickerSkinToneVariant[];
  searchText: string;
}

type UnknownRecord = Record<string, unknown>;

const props = withDefaults(defineProps<INmorphEmojiPickerProps>(), {
  language: 'en',
  dataSource: () => [],
  i18n: () => ({}),
  quickList: () => [],
  initialExpanded: true,
  width: '300px',
  height: '260px',
  columns: 8,
  cellSize: undefined,
  toggleSize: undefined,
  scrollbarSize: undefined,
  hoverBackground: undefined,
  activeBackground: undefined,
  focusRing: undefined,
  disabled: false,
  hideShadow: false,
});

const emit = defineEmits<INmorphEmojiPickerEmit>();

const searchQuery = ref('');
const expanded = ref(props.initialExpanded);
const selectedGroup = ref('');
const activeIndex = ref(0);
const gridRef = ref<HTMLElement | null>(null);

const fallbackTexts: Required<
  Pick<
    INmorphEmojiPickerI18n,
    | 'searchPlaceholder'
    | 'searchLabel'
    | 'quickLabel'
    | 'expandLabel'
    | 'collapseLabel'
    | 'noResults'
    | 'categoryLabel'
    | 'resultsLabel'
  >
> = {
  searchPlaceholder: 'Search emoji',
  searchLabel: 'Search emoji',
  quickLabel: 'Frequent emoji',
  expandLabel: 'Open emoji picker',
  collapseLabel: 'Close emoji picker',
  noResults: 'No emoji found',
  categoryLabel: 'Emoji categories',
  resultsLabel: 'Emoji results',
};

const isRecord = (value: unknown): value is UnknownRecord =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const normalizeSearchValue = (value: string) => value.trim().toLocaleLowerCase(props.language || undefined);

const getStringCandidate = (record: UnknownRecord, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
    if (typeof value === 'number') return String(value);
  }

  return '';
};

const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.flatMap(toStringList);
  if (typeof value === 'string') return value.trim() ? [value.trim()] : [];
  if (typeof value === 'number') return [String(value)];
  if (isRecord(value)) return Object.values(value).flatMap(toStringList);
  return [];
};

const getNumberCandidate = (record: UnknownRecord, keys: string[], fallback: number) => {
  for (const key of keys) {
    const value = record[key];
    const numberValue = typeof value === 'number' ? value : Number(value);
    if (Number.isFinite(numberValue)) return numberValue;
  }

  return fallback;
};

const getArrayCandidate = (record: UnknownRecord, keys: string[]) => {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }

  return undefined;
};

const getEmojiValue = (value: unknown) => {
  if (typeof value === 'string') return value.trim();
  if (!isRecord(value)) return '';

  const directValue = getStringCandidate(value, ['emoji', 'native', 'char', 'unicode', 'value']);
  if (directValue) return directValue;

  const firstSkin = getArrayCandidate(value, ['skinToneVariants', 'skins', 'variants'])?.[0];
  return getEmojiValue(firstSkin);
};

const hasEmojiValue = (value: unknown) => Boolean(getEmojiValue(value));

const normalizeVariants = (value: unknown): INmorphEmojiPickerSkinToneVariant[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((variant): INmorphEmojiPickerSkinToneVariant | null => {
      const emoji = getEmojiValue(variant);
      if (!emoji) return null;

      if (typeof variant === 'string') return { emoji };

      const record = isRecord(variant) ? variant : {};
      return {
        emoji,
        annotation: getStringCandidate(record, ['annotation', 'label', 'name', 'description']),
        tags: toStringList(record.tags || record.keywords || record.aliases || record.shortcodes),
        tone: getStringCandidate(record, ['tone', 'skinTone', 'skin_tone']),
      };
    })
    .filter((variant): variant is INmorphEmojiPickerSkinToneVariant => Boolean(variant));
};

const getGroupData = (value: unknown, fallbackGroup: string, fallbackOrder: number) => {
  if (!isRecord(value)) {
    return {
      key: fallbackGroup,
      label: fallbackGroup,
      sort: fallbackOrder,
    };
  }

  const group = getStringCandidate(value, ['group', 'category', 'groupName', 'categoryName']) || fallbackGroup;
  const label = getStringCandidate(value, ['groupLabel', 'categoryLabel']) || group;
  const sort = getNumberCandidate(value, ['groupOrder', 'categoryOrder'], Number(group));

  return {
    key: group,
    label,
    sort: Number.isFinite(sort) ? sort : fallbackOrder,
  };
};

const normalizeEmojiItem = (
  value: unknown,
  fallbackGroup: string,
  fallbackGroupLabel: string,
  fallbackGroupSort: number,
  fallbackOrder: number
) => {
  const emoji = getEmojiValue(value);
  if (!emoji) return null;

  const record = isRecord(value) ? value : {};
  const groupData = getGroupData(record, fallbackGroup, fallbackGroupSort);
  const annotation = getStringCandidate(record, ['annotation', 'label', 'name', 'description']) || emoji;
  const tags = toStringList(record.tags || record.keywords || record.aliases || record.shortcodes);
  const order = getNumberCandidate(record, ['order', 'sortOrder', 'sort_order', 'index'], fallbackOrder);
  const rawVariants = record.skinToneVariants || record.skins || record.variants;
  const skinToneVariants = normalizeVariants(rawVariants).filter((variant) => variant.emoji !== emoji);
  const groupKey = groupData.key || fallbackGroup;
  const groupLabel = groupData.label || fallbackGroupLabel || groupKey;
  const searchText = normalizeSearchValue(
    [emoji, annotation, groupLabel, ...tags, ...skinToneVariants.map((variant) => variant.annotation || variant.emoji)]
      .filter(Boolean)
      .join(' ')
  );

  return {
    key: `${groupKey}-${order}-${emoji}`,
    emoji,
    annotation,
    tags,
    groupKey,
    groupLabel,
    groupSort: groupData.sort,
    order,
    skinToneVariants,
    searchText,
  };
};

const getGroupedChildren = (value: unknown) => {
  if (!isRecord(value) || hasEmojiValue(value)) return undefined;
  return getArrayCandidate(value, ['emojis', 'items', 'children', 'data']);
};

const normalizeDataSource = (value: unknown): INmorphEmojiPickerNormalizedItem[] => {
  const result: INmorphEmojiPickerNormalizedItem[] = [];

  const addItem = (
    item: unknown,
    fallbackGroup = 'emoji',
    fallbackGroupLabel = fallbackGroup,
    fallbackGroupSort = 0,
    fallbackOrder = result.length
  ) => {
    const normalizedItem = normalizeEmojiItem(
      item,
      fallbackGroup,
      fallbackGroupLabel,
      fallbackGroupSort,
      fallbackOrder
    );
    if (normalizedItem) result.push(normalizedItem);
  };

  const addGroup = (groupValue: unknown, fallbackGroup: string, fallbackGroupSort: number) => {
    const children = getGroupedChildren(groupValue);
    if (!children) {
      addItem(groupValue, 'emoji', 'emoji', 0, fallbackGroupSort);
      return;
    }

    const record = isRecord(groupValue) ? groupValue : {};
    const group = getStringCandidate(record, ['group', 'category', 'name', 'label']) || fallbackGroup;
    const groupLabel = getStringCandidate(record, ['label', 'name', 'title', 'groupLabel', 'categoryLabel']) || group;
    const groupOrder = getNumberCandidate(record, ['order', 'groupOrder', 'categoryOrder'], fallbackGroupSort);

    children.forEach((item, index) => addItem(item, group, groupLabel, groupOrder, index));
  };

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      if (getGroupedChildren(item)) {
        addGroup(item, `group-${index + 1}`, index);
      } else {
        addItem(item, 'emoji', 'emoji', 0, index);
      }
    });
  } else if (isRecord(value)) {
    const directChildren = getGroupedChildren(value);
    if (directChildren) {
      const group = getStringCandidate(value, ['group', 'category', 'name', 'label']) || 'emoji';
      const groupLabel = getStringCandidate(value, ['label', 'name', 'title', 'groupLabel', 'categoryLabel']) || group;
      const groupOrder = getNumberCandidate(value, ['order', 'groupOrder', 'categoryOrder'], 0);
      directChildren.forEach((item, index) => addItem(item, group, groupLabel, groupOrder, index));
    } else {
      Object.entries(value).forEach(([group, groupValue], index) => {
        if (Array.isArray(groupValue)) {
          groupValue.forEach((item, itemIndex) => addItem(item, group, group, index, itemIndex));
        } else {
          addGroup(groupValue, group, index);
        }
      });
    }
  }

  return result.sort((first, second) => {
    if (first.groupSort !== second.groupSort) return first.groupSort - second.groupSort;
    return first.order - second.order;
  });
};

const texts = computed(() => ({
  ...fallbackTexts,
  ...props.i18n,
}));
const categoryLabels = computed(() => ({
  ...(props.i18n?.categories || {}),
  ...(props.i18n?.categoryLabels || {}),
}));
const allEmoji = computed(() => normalizeDataSource(props.dataSource));
const labelByEmoji = computed(() => {
  const result = new Map<string, string>();
  allEmoji.value.forEach((item) => result.set(item.emoji, item.annotation || item.emoji));
  return result;
});
const quickItems = computed(() => Array.from(new Set(props.quickList.map((emoji) => emoji.trim()).filter(Boolean))));
const showCompact = computed(() => !expanded.value && quickItems.value.length > 0);
const query = computed(() => normalizeSearchValue(searchQuery.value));

const categoryOptions = computed(() => {
  const groups = new Map<string, { key: string; label: string; sort: number }>();

  allEmoji.value.forEach((item) => {
    if (groups.has(item.groupKey)) return;
    groups.set(item.groupKey, {
      key: item.groupKey,
      label: categoryLabels.value[item.groupKey] || item.groupLabel,
      sort: item.groupSort,
    });
  });

  return Array.from(groups.values()).sort((first, second) => first.sort - second.sort);
});

watch(
  categoryOptions,
  (options) => {
    if (!options.length) {
      selectedGroup.value = '';
      return;
    }

    if (!options.some((option) => option.key === selectedGroup.value)) {
      selectedGroup.value = options[0].key;
    }
  },
  { immediate: true }
);

watch(
  () => props.initialExpanded,
  (value) => {
    expanded.value = value;
  }
);

watch([query, selectedGroup], () => {
  activeIndex.value = 0;
});

const visibleItems = computed(() => {
  if (query.value) return allEmoji.value.filter((item) => item.searchText.includes(query.value));
  if (!selectedGroup.value) return allEmoji.value;
  return allEmoji.value.filter((item) => item.groupKey === selectedGroup.value);
});

const visibleSections = computed(() => {
  const sections = new Map<string, { key: string; label: string; items: INmorphEmojiPickerNormalizedItem[] }>();

  visibleItems.value.forEach((item) => {
    const label = categoryLabels.value[item.groupKey] || item.groupLabel;
    const section = sections.get(item.groupKey) || {
      key: item.groupKey,
      label,
      items: [],
    };
    section.items.push(item);
    sections.set(item.groupKey, section);
  });

  return Array.from(sections.values());
});

const visibleFlatItems = computed(() => visibleSections.value.flatMap((section) => section.items));
const activeCategoryLabel = computed(
  () => categoryOptions.value.find((option) => option.key === selectedGroup.value)?.label || texts.value.resultsLabel
);
const bodyLabel = computed(() => (query.value ? texts.value.resultsLabel : activeCategoryLabel.value));
const canCollapse = computed(() => !props.initialExpanded && quickItems.value.length > 0);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-emoji-picker': [
      showCompact.value && 'compact',
      expanded.value && 'expanded',
      canCollapse.value && 'collapsible',
      props.disabled && 'disabled',
      props.hideShadow && 'hide-shadow',
      !allEmoji.value.length && 'empty',
    ],
  })
);
const styles = computed<CSSProperties>(() => ({
  ...createCssSizeVariables({
    '--nmorph-private-emoji-picker-width': props.width,
    '--nmorph-private-emoji-picker-height': props.height,
    '--nmorph-private-emoji-picker-cell-size': props.cellSize,
    '--nmorph-private-emoji-picker-toggle-size': props.toggleSize,
    '--nmorph-private-emoji-picker-scrollbar-size': props.scrollbarSize,
  }),
  ...createCssVariables({
    '--nmorph-private-emoji-picker-hover-background': props.hoverBackground,
    '--nmorph-private-emoji-picker-active-background': props.activeBackground,
    '--nmorph-private-emoji-picker-focus-ring': props.focusRing,
  }),
  '--nmorph-private-emoji-picker-columns': Math.max(1, Math.floor(props.columns)),
}));

const getEmojiLabel = (emoji: string) => labelByEmoji.value.get(emoji) || emoji;

const selectEmoji = (emoji: string) => {
  if (props.disabled) return;
  emit('select', emoji);
};

const expandHandler = () => {
  if (props.disabled) return;
  expanded.value = true;
  emit('expand');
};

const collapseHandler = () => {
  if (props.disabled || !canCollapse.value) return;
  expanded.value = false;
  emit('collapse');
};

const toggleExpandedHandler = (nextExpanded: boolean) => {
  if (nextExpanded) {
    expandHandler();
    return;
  }

  collapseHandler();
};

const focusEmojiButton = async (index: number) => {
  const buttons = gridRef.value?.querySelectorAll<HTMLButtonElement>('.nmorph-emoji-picker__emoji');
  if (!buttons?.length) return;

  const nextIndex = Math.min(Math.max(index, 0), buttons.length - 1);
  activeIndex.value = nextIndex;
  await nextTick();
  buttons[nextIndex]?.focus();
};

const gridKeydownHandler = (event: KeyboardEvent) => {
  if (props.disabled || !visibleFlatItems.value.length) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  const columnCount = Math.max(1, Math.floor(props.columns));
  const lastIndex = visibleFlatItems.value.length - 1;
  const keyOffsetMap: Record<string, number> = {
    ArrowRight: 1,
    ArrowLeft: -1,
    ArrowDown: columnCount,
    ArrowUp: -columnCount,
  };

  if (event.key in keyOffsetMap) {
    event.preventDefault();
    focusEmojiButton(activeIndex.value + keyOffsetMap[event.key]);
  }

  if (event.key === 'Home') {
    event.preventDefault();
    focusEmojiButton(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    focusEmojiButton(lastIndex);
  }
};
</script>

<template>
  <div :class="modifiers" :style="styles" :lang="props.language">
    <NmorphCheckbox
      v-if="canCollapse"
      class="nmorph-emoji-picker__toggle-button nmorph-emoji-picker__expand-button"
      :class="{ 'nmorph-emoji-picker__collapse-button': expanded }"
      design="nmorph"
      :model-value="expanded"
      :aria-label="expanded ? texts.collapseLabel : texts.expandLabel"
      :title="expanded ? texts.collapseLabel : texts.expandLabel"
      :disabled="props.disabled"
      @click.prevent="toggleExpandedHandler(!expanded)"
    >
      <template #label>
        <NmorphIcon size="small">
          <NmorphIconBurger />
        </NmorphIcon>
        <span class="nmorph-emoji-picker__button-label">
          {{ expanded ? texts.collapseLabel : texts.expandLabel }}
        </span>
      </template>
    </NmorphCheckbox>
    <div v-if="showCompact" class="nmorph-emoji-picker__compact" role="group" :aria-label="texts.quickLabel">
      <NmorphScroll
        class="nmorph-emoji-picker__quick-list"
        height="calc(var(--nmorph-private-emoji-picker-cell-size) + var(--nmorph-private-emoji-picker-scrollbar-size))"
        max-height="calc(var(--nmorph-private-emoji-picker-cell-size) + var(--nmorph-private-emoji-picker-scrollbar-size))"
        scroll-y-prop="hidden"
        scroll-x-prop="auto"
        css-scroll-behavior="auto"
        :x-bar-width-in-px="6"
      >
        <button
          v-for="emoji in quickItems"
          :key="emoji"
          type="button"
          class="nmorph-emoji-picker__quick-button"
          :aria-label="getEmojiLabel(emoji)"
          :title="getEmojiLabel(emoji)"
          :disabled="props.disabled"
          @click="selectEmoji(emoji)"
        >
          {{ emoji }}
        </button>
      </NmorphScroll>
    </div>
    <div v-else class="nmorph-emoji-picker__panel">
      <div class="nmorph-emoji-picker__toolbar">
        <NmorphTextInput
          v-model="searchQuery"
          class="nmorph-emoji-picker__search"
          :placeholder="texts.searchPlaceholder"
          :disabled="props.disabled"
          :input-attrs="{
            class: 'nmorph-emoji-picker__search-input',
            role: 'searchbox',
            'aria-label': texts.searchLabel,
          }"
        >
          <template #prepend-icon>
            <NmorphIcon size="small">
              <NmorphIconSearch />
            </NmorphIcon>
          </template>
        </NmorphTextInput>
      </div>
      <NmorphScroll
        v-if="categoryOptions.length && !query"
        class="nmorph-emoji-picker__categories"
        height="40px"
        max-height="40px"
        scroll-y-prop="hidden"
        scroll-x-prop="auto"
        css-scroll-behavior="auto"
        :x-bar-width-in-px="6"
        :x-gap-in-px="6"
        role="tablist"
        :aria-label="texts.categoryLabel"
      >
        <button
          v-for="category in categoryOptions"
          :key="category.key"
          type="button"
          class="nmorph-emoji-picker__category"
          :class="{ 'nmorph-emoji-picker__category--active': category.key === selectedGroup }"
          role="tab"
          :aria-selected="category.key === selectedGroup"
          :disabled="props.disabled"
          @click="selectedGroup = category.key"
        >
          {{ category.label }}
        </button>
      </NmorphScroll>
      <NmorphScroll
        class="nmorph-emoji-picker__body"
        height="100%"
        max-height="100%"
        scroll-x-prop="hidden"
        scroll-y-prop="auto"
        css-scroll-behavior="auto"
        :y-bar-width-in-px="8"
      >
        <div
          ref="gridRef"
          class="nmorph-emoji-picker__body-content"
          :aria-label="bodyLabel"
          @keydown="gridKeydownHandler"
        >
          <template v-if="visibleSections.length">
            <section v-for="section in visibleSections" :key="section.key" class="nmorph-emoji-picker__section">
              <div v-if="query" class="nmorph-emoji-picker__section-title">{{ section.label }}</div>
              <div class="nmorph-emoji-picker__grid">
                <button
                  v-for="item in section.items"
                  :key="item.key"
                  type="button"
                  class="nmorph-emoji-picker__emoji"
                  :aria-label="item.annotation"
                  :title="item.annotation"
                  :disabled="props.disabled"
                  @focus="activeIndex = visibleFlatItems.findIndex((visibleItem) => visibleItem.key === item.key)"
                  @click="selectEmoji(item.emoji)"
                >
                  <span class="nmorph-emoji-picker__emoji-symbol">{{ item.emoji }}</span>
                </button>
              </div>
            </section>
          </template>
          <div v-else class="nmorph-emoji-picker__empty">
            <NmorphIcon>
              <NmorphIconSmile />
            </NmorphIcon>
            <span>{{ texts.noResults }}</span>
          </div>
        </div>
      </NmorphScroll>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-emoji-picker {
  --nmorph-private-emoji-picker-width: 300px;
  --nmorph-private-emoji-picker-height: 260px;
  --nmorph-private-emoji-picker-columns: 8;
  --nmorph-private-emoji-picker-cell-size: 32px;
  --nmorph-private-emoji-picker-toggle-size: 28px;
  --nmorph-private-emoji-picker-scrollbar-size: 6px;
  --nmorph-private-emoji-picker-hover-background: color-mix(in srgb, var(--nmorph-text-color) 8%, transparent);
  --nmorph-private-emoji-picker-active-background: color-mix(
    in srgb,
    var(--nmorph-text-color) 12%,
    var(--nmorph-main-color)
  );
  --nmorph-private-emoji-picker-focus-ring: color-mix(in srgb, var(--nmorph-text-color) 24%, transparent);
  --nmorph-private-emoji-picker-toggle-inset: calc(var(--indentation-02) + 2px);
  --nmorph-private-ep-toggle-size: var(--nmorph-private-emoji-picker-toggle-size);
  --nmorph-private-ep-toggle-inset: var(--nmorph-private-emoji-picker-toggle-inset);
  --nmorph-private-ep-toggle-edge: calc(var(--nmorph-private-ep-toggle-size) + var(--nmorph-private-ep-toggle-inset));
  --nmorph-private-emoji-picker-toggle-reserve: calc(var(--nmorph-private-ep-toggle-edge) + var(--indentation-02));

  position: relative;
  box-sizing: border-box;
  width: min(100%, var(--nmorph-private-emoji-picker-width));
  min-width: 0;
  color: var(--nmorph-text-color);
  font: inherit;

  .nmorph-emoji-picker__compact,
  .nmorph-emoji-picker__panel {
    box-sizing: border-box;
    width: 100%;
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow: var(--nmorph-shadow-inset);
  }

  .nmorph-emoji-picker__compact {
    display: flex;
    gap: var(--indentation-02);
    align-items: center;
    min-height: 48px;
    padding: var(--indentation-02);
  }

  .nmorph-emoji-picker__quick-list {
    display: flex;
    flex: 1 1 auto;
    gap: 4px;
    min-width: 0;
  }

  .nmorph-emoji-picker__quick-button,
  .nmorph-emoji-picker__category,
  .nmorph-emoji-picker__emoji {
    margin: 0;
    color: inherit;
    font: inherit;
    background: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
    appearance: none;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      box-shadow:
        var(--nmorph-shadow-inset),
        0 0 0 1px var(--nmorph-private-emoji-picker-focus-ring);
    }
  }

  .nmorph-emoji-picker__quick-button,
  .nmorph-emoji-picker__emoji {
    display: inline-flex;
    flex: 0 0 var(--nmorph-private-emoji-picker-cell-size);
    justify-content: center;
    align-items: center;
    width: var(--nmorph-private-emoji-picker-cell-size);
    height: var(--nmorph-private-emoji-picker-cell-size);
    padding: 0;
    font-size: 20px;
    line-height: 1;
    border-radius: var(--default-border-radius);

    &:hover:not(:disabled) {
      background: var(--nmorph-private-emoji-picker-hover-background);
    }
  }

  .nmorph-emoji-picker__toggle-button {
    position: absolute;
    top: var(--nmorph-private-emoji-picker-toggle-inset);
    right: var(--nmorph-private-emoji-picker-toggle-inset);
    z-index: 2;
    width: var(--nmorph-private-emoji-picker-toggle-size);
    min-width: var(--nmorph-private-emoji-picker-toggle-size);
    height: var(--nmorph-private-emoji-picker-toggle-size);
    min-height: var(--nmorph-private-emoji-picker-toggle-size);
    color: var(--nmorph-semi-contrast-text-color);

    --nmorph-private-control-height: var(--nmorph-private-emoji-picker-toggle-size);
    --nmorph-private-selection-control-size: var(--nmorph-private-emoji-picker-toggle-size);
    --nmorph-private-selection-control-inline-padding: 0;
    --nmorph-private-icon-color: currentColor;

    .nmorph-checkbox__content,
    .nmorph-checkbox__fake {
      width: var(--nmorph-private-emoji-picker-toggle-size);
      min-width: var(--nmorph-private-emoji-picker-toggle-size);
      height: var(--nmorph-private-emoji-picker-toggle-size);
      min-height: var(--nmorph-private-emoji-picker-toggle-size);
    }

    .nmorph-checkbox__fake {
      padding: 0;
      color: currentColor;
    }

    .nmorph-icon {
      --nmorph-private-icon-color: currentColor;
    }

    input:focus-visible {
      outline: none;
      opacity: 0;
      scale: 1;
    }

    input:focus-visible + .nmorph-checkbox__fake {
      outline: 1px solid var(--nmorph-private-emoji-picker-focus-ring);
      outline-offset: 1px;
    }

    &:hover:not(.nmorph-checkbox--disabled) {
      color: var(--nmorph-text-color);

      --nmorph-private-icon-color: var(--nmorph-text-color);
    }

    &:hover:not(.nmorph-checkbox--disabled) .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-text-color);
    }
  }

  .nmorph-emoji-picker__button-label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    overflow: hidden;
    white-space: nowrap;
    clip-path: inset(50%);
  }

  .nmorph-emoji-picker__panel {
    display: flex;
    flex-direction: column;
    height: var(--nmorph-private-emoji-picker-height);
    min-height: 180px;
    max-height: min(60vh, var(--nmorph-private-emoji-picker-height));
    padding: var(--indentation-02);
    overflow: hidden;
  }

  &.nmorph-emoji-picker--hide-shadow {
    .nmorph-emoji-picker__panel {
      box-shadow: none;
    }
  }

  .nmorph-emoji-picker__toolbar {
    display: flex;
    flex: 0 0 auto;
    gap: var(--indentation-02);
    align-items: center;
    min-width: 0;
    padding: 2px;
  }

  &.nmorph-emoji-picker--collapsible {
    .nmorph-emoji-picker__compact {
      padding-right: var(--nmorph-private-emoji-picker-toggle-reserve);
    }

    .nmorph-emoji-picker__toolbar {
      padding-right: var(--nmorph-private-emoji-picker-toggle-reserve);
    }
  }

  .nmorph-emoji-picker__search {
    flex: 1 1 auto;
    min-width: 0;
  }

  .nmorph-emoji-picker__categories {
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    align-items: flex-start;
    min-width: 0;
    margin: var(--indentation-02) 0;
    padding: 0 2px;

    .nmorph-scroll__bar--horizontal {
      right: 2px;
      left: 2px;
    }
  }

  .nmorph-emoji-picker__category {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    max-width: 120px;
    min-height: 32px;
    padding: 0 10px;
    overflow: hidden;
    color: var(--nmorph-semi-contrast-text-color);
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: var(--default-border-radius);

    &:hover:not(:disabled) {
      color: var(--nmorph-text-color);
      background: var(--nmorph-private-emoji-picker-hover-background);
    }

    &.nmorph-emoji-picker__category--active {
      color: var(--nmorph-text-color);
      background: var(--nmorph-private-emoji-picker-active-background);
      box-shadow: var(--nmorph-shadow-inset);
    }
  }

  .nmorph-emoji-picker__body {
    flex: 1 1 auto;
    min-height: 0;
  }

  .nmorph-emoji-picker__body-content {
    box-sizing: border-box;
    min-height: 100%;
    padding: 2px;
  }

  .nmorph-emoji-picker__section {
    display: grid;
    gap: 4px;

    & + .nmorph-emoji-picker__section {
      margin-top: var(--indentation-02);
    }
  }

  .nmorph-emoji-picker__section-title {
    padding: 0 4px;
    color: var(--nmorph-semi-contrast-text-color);
    font-weight: var(--font-weight-semibold);
    font-size: var(--nmorph-typography-label-font-size);
    line-height: var(--nmorph-typography-label-line-height);
  }

  .nmorph-emoji-picker__grid {
    display: grid;
    grid-template-columns: repeat(var(--nmorph-private-emoji-picker-columns), minmax(0, 1fr));
    gap: 2px;
  }

  .nmorph-emoji-picker__emoji {
    width: 100%;
    min-width: 0;
  }

  .nmorph-emoji-picker__emoji-symbol {
    display: block;
    line-height: 1;
  }

  .nmorph-emoji-picker__empty {
    display: grid;
    gap: var(--indentation-02);
    place-items: center;
    min-height: 100%;
    padding: var(--indentation-04);
    color: var(--nmorph-semi-contrast-text-color);
    text-align: center;

    --nmorph-private-icon-color: currentColor;
  }

  &.nmorph-emoji-picker--disabled {
    opacity: 0.65;
  }
}
</style>
