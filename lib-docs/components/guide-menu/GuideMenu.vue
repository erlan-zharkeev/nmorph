<script setup lang="ts">
import { guideGroups, guidePageMap, textByLocale, type GuidePageSlug } from "~/data/guide";

const { locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const props = withDefaults(
  defineProps<{
    activeSlug?: GuidePageSlug | "";
  }>(),
  {
    activeSlug: "",
  }
);

const currentSlug = computed(() => props.activeSlug || String(route.params.slug || ""));
</script>

<template>
  <nav class="docs-guide-menu">
    <NuxtLink :to="localePath('/guide')" class="docs-guide-menu__root"
      :class="{ 'docs-guide-menu__link--active': !currentSlug }">
      {{ $t("guide-page.title") }}
    </NuxtLink>
    <div v-for="group in guideGroups" :key="group.title.en" class="docs-guide-menu__group">
      <div class="docs-guide-menu__group-title">{{ textByLocale(group.title, locale) }}</div>
      <NuxtLink v-for="slug in group.pages" :key="slug" :to="localePath(`/guide/${slug}`)"
        class="docs-guide-menu__link" :class="{ 'docs-guide-menu__link--active': currentSlug === slug }">
        {{ textByLocale(guidePageMap[slug].title, locale) }}
      </NuxtLink>
    </div>
  </nav>
</template>

<style lang="scss">
.docs-guide-menu {
  display: flex;
  flex-direction: column;
  gap: 16px;

  a {
    text-decoration: none;
  }
}

.docs-guide-menu__root {
  font-size: var(--font-size-medium);
  font-weight: 800;
}

.docs-guide-menu__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.docs-guide-menu__group-title {
  color: var(--nmorph-semi-contrast-text-color);
  font-size: var(--font-size-extra-small);
  font-weight: 800;
  text-transform: uppercase;
}

.docs-guide-menu__link {
  font-size: var(--font-size-small);
  line-height: var(--line-height-compact);
}

.docs-guide-menu__link--active {
  color: var(--nmorph-accent-color);
  font-weight: 800;
}
</style>
