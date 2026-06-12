<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
import { guideGroups, guidePageMap, textByLocale } from "~/data/guide";

const { locale } = useI18n();
const localePath = useLocalePath();
</script>

<template>
  <div class="docs-guide-landing">
    <NmorphCard tag="section" class="docs-guide-landing__hero" :paper="3">
      <p class="docs-guide-landing__eyebrow">{{ $t("guide-page.title") }}</p>
      <h1>{{ $t("guide-page.full-title") }}</h1>
      <p>{{ $t("guide-page.full-description") }}</p>
    </NmorphCard>

    <section class="docs-guide-landing__groups">
      <div v-for="group in guideGroups" :key="group.title.en" class="docs-guide-landing__group">
        <h2>{{ textByLocale(group.title, locale) }}</h2>
        <div class="docs-guide-landing__grid">
          <NuxtLink v-for="slug in group.pages" :key="slug" :to="localePath(`/guide/${slug}`)">
            <NmorphCard class="docs-guide-landing__card" :paper="3">
              <h3>{{ textByLocale(guidePageMap[slug].title, locale) }}</h3>
              <p>{{ textByLocale(guidePageMap[slug].description, locale) }}</p>
            </NmorphCard>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.docs-guide-landing {
  width: 100%;
}

.docs-guide-landing__hero {
  padding: 32px;
  margin-bottom: 24px;
  border-radius: 4px;

  h1 {
    margin: 0;
    font-size: 42px;
    line-height: 1.1;
  }

  p:last-child {
    max-width: 900px;
    margin: 16px 0 0;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }
}

.docs-guide-landing__eyebrow {
  margin: 0 0 8px;
  color: var(--nmorph-accent-color);
  font-weight: 700;
}

.docs-guide-landing__group {
  margin-bottom: 32px;

  h2 {
    margin: 0 0 16px;
    font-size: var(--font-size-extra-large);
  }
}

.docs-guide-landing__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  a {
    text-decoration: none;
  }
}

.docs-guide-landing__card {
  height: 100%;

  h3 {
    margin: 0 0 8px;
    font-size: var(--font-size-medium);
  }

  p {
    margin: 0;
    line-height: var(--line-height-loose);
  }
}

@media (max-width: 720px) {
  .docs-guide-landing__hero {
    padding: 24px;

    h1 {
      font-size: 32px;
    }
  }

  .docs-guide-landing__grid {
    grid-template-columns: 1fr;
  }
}
</style>
