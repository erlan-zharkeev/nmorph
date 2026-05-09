<script setup lang="ts">
import {
  NmorphIcon,
  NmorphIconSearch,
  NmorphOverlay,
  NmorphTextInput,
} from "@nmorph/nmorph-ui-kit";
import { createSearchItems } from "~/data/search";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: "update:open", value: boolean): void }>();

const { locale } = useI18n();
const localePath = useLocalePath();
const router = useRouter();

const query = ref("");
const activeIndex = ref(0);
const searchInput = ref<{ focus: () => void } | null>(null);

const normalize = (value: string) => value.toLowerCase().trim();
const items = computed(() => createSearchItems(locale.value));
const normalizedQuery = computed(() => normalize(query.value));

const filteredItems = computed(() => {
  const search = normalizedQuery.value;

  if (!search) return items.value.slice(0, 10).map((item) => ({ ...item, score: 0 }));

  const parts = search.split(/\s+/).filter(Boolean);

  return items.value
    .flatMap((item) => {
      const title = normalize(item.title);
      const haystack = normalize([item.title, item.description, ...item.keywords].join(" "));

      if (!parts.every((part) => haystack.includes(part))) return [];

      const score = title.startsWith(search) ? 0 : title.includes(search) ? 1 : 2;

      return [{ ...item, score }];
    })
    .sort((first, second) => first.score - second.score || first.title.localeCompare(second.title))
    .slice(0, 14);
});

const close = () => {
  emit("update:open", false);
};

const localizedPath = (path: string) => {
  const [pathname, hash] = path.split("#");

  if (!hash) return localePath(pathname);

  return localePath({ path: pathname, hash: `#${hash}` });
};

const openItem = async (item: (typeof filteredItems.value)[number]) => {
  await router.push(localizedPath(item.path));
  close();
};

const openSelected = () => {
  const item = filteredItems.value[activeIndex.value];
  if (item) openItem(item);
};

const selectNext = () => {
  if (!filteredItems.value.length) return;
  activeIndex.value = (activeIndex.value + 1) % filteredItems.value.length;
};

const selectPrev = () => {
  if (!filteredItems.value.length) return;
  activeIndex.value = (activeIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length;
};

watch(
  () => props.open,
  async (open) => {
    if (!open) return;

    activeIndex.value = 0;
    await nextTick();
    searchInput.value?.focus();
  }
);

watch(normalizedQuery, () => {
  activeIndex.value = 0;
});

watch(filteredItems, (value) => {
  if (activeIndex.value >= value.length) activeIndex.value = Math.max(value.length - 1, 0);
});
</script>

<template>
  <NmorphOverlay :show="props.open" transparent :z-index="3000" @on-outside-click="close">
    <div
      v-if="props.open"
      class="docs-search-dialog"
      @keydown.down.prevent="selectNext"
      @keydown.up.prevent="selectPrev"
      @keydown.enter.prevent="openSelected"
      @keydown.esc.prevent="close"
    >
      <div class="docs-search-dialog__panel nmorph--shadow-outset">
        <NmorphTextInput
          ref="searchInput"
          v-model="query"
          clearable
          :placeholder="$t('search-dialog.placeholder')"
        >
          <template #prepend-icon>
            <NmorphIcon size="small">
              <NmorphIconSearch />
            </NmorphIcon>
          </template>
        </NmorphTextInput>

        <div class="docs-search-dialog__hint">{{ $t("search-dialog.hint") }}</div>

        <div v-if="filteredItems.length" class="docs-search-dialog__results">
          <button
            v-for="(item, index) in filteredItems"
            :key="`${item.group}-${item.path}-${item.title}`"
            type="button"
            class="docs-search-dialog__result"
            @click="openItem(item)"
          >
            <span class="docs-search-dialog__result-group">
              {{ $t(`search-dialog.groups.${item.group}`) }}
            </span>
            <span class="docs-search-dialog__result-title">{{ item.title }}</span>
            <span class="docs-search-dialog__result-description">{{ item.description }}</span>
          </button>
        </div>

        <div v-else class="docs-search-dialog__empty">{{ $t("search-dialog.empty") }}</div>
      </div>
    </div>
  </NmorphOverlay>
</template>

<style scoped lang="scss">
.docs-search-dialog {
  position: fixed;
  top: 70px;
  left: 50%;
  width: min(720px, calc(100vw - 32px));
  transform: translateX(-50%);
}

.docs-search-dialog__panel {
  padding: 16px;
  border-radius: 4px;
  background: var(--nmorph-main-color);
}

.docs-search-dialog__hint {
  margin: 10px 4px 12px;
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-small);
}

.docs-search-dialog__results {
  display: grid;
  gap: 8px;
  max-height: min(60vh, 560px);
  overflow: auto;
  padding: 4px;
}

.docs-search-dialog__result {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 4px 10px;
  width: 100%;
  padding: 12px;
  border: 0;
  border-radius: 4px;
  color: var(--nmorph-text-color);
  text-align: left;
  background: transparent;
  cursor: pointer;
}

.docs-search-dialog__result-group {
  align-self: start;
  padding: 3px 8px;
  border-radius: 4px;
  color: var(--nmorph-accent-color);
  font-size: var(--font-size-extra-small);
  font-weight: 700;
  background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
}

.docs-search-dialog__result-title {
  font-weight: 700;
}

.docs-search-dialog__result-description {
  grid-column: 2;
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-small);
  line-height: var(--line-height-base);
}

.docs-search-dialog__empty {
  padding: 24px 8px 8px;
  color: var(--nmorph-semi-contrast-text-color);
  text-align: center;
}

@media (max-width: 720px) {
  .docs-search-dialog {
    top: 58px;
    width: calc(100vw - 24px);
  }

  .docs-search-dialog__result {
    grid-template-columns: 1fr;
  }

  .docs-search-dialog__result-description {
    grid-column: 1;
  }
}
</style>
