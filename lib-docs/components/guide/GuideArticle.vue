<script setup lang="ts">
import { NmorphDivider } from "@nmorph/nmorph-ui-kit";
import { guidePageMap, guidePages, textByLocale, type GuidePageSlug } from "~/data/guide";

const props = defineProps<{
  slug: GuidePageSlug;
}>();

const { locale } = useI18n();
const localePath = useLocalePath();
const page = computed(() => guidePageMap[props.slug]);
const currentIndex = computed(() => guidePages.findIndex((guidePage) => guidePage.slug === props.slug));
const previousPage = computed(() => guidePages[currentIndex.value - 1]);
const nextPage = computed(() => guidePages[currentIndex.value + 1]);
</script>

<template>
  <article v-if="page" class="docs-guide-article">
    <header class="docs-guide-article__header nmorph--shadow-outset">
      <p class="docs-guide-article__eyebrow">{{ $t("guide") }}</p>
      <h1>{{ textByLocale(page.title, locale) }}</h1>
      <p>{{ textByLocale(page.description, locale) }}</p>
    </header>

    <section v-for="section in page.sections" :id="section.title.en.toLowerCase().replaceAll(' ', '-')" :key="section.title.en"
      class="docs-guide-article__section">
      <h2>{{ textByLocale(section.title, locale) }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph.en">
        {{ textByLocale(paragraph, locale) }}
      </p>
      <ul v-if="section.points?.length" class="docs-guide-article__points">
        <li v-for="point in section.points" :key="point.en">{{ textByLocale(point, locale) }}</li>
      </ul>
      <div v-if="section.code" class="docs-guide-article__code">
        <code-example :lang="section.code.language">{{ section.code.content }}</code-example>
      </div>
    </section>

    <NmorphDivider />

    <nav class="docs-guide-article__pager">
      <NuxtLink v-if="previousPage" :to="localePath(`/guide/${previousPage.slug}`)">
        {{ textByLocale(previousPage.title, locale) }}
      </NuxtLink>
      <span v-else />
      <NuxtLink v-if="nextPage" :to="localePath(`/guide/${nextPage.slug}`)">
        {{ textByLocale(nextPage.title, locale) }}
      </NuxtLink>
    </nav>
  </article>
</template>

<style scoped lang="scss">
.docs-guide-article {
  width: 100%;
  padding: 16px;
}

.docs-guide-article__header {
  padding: 32px;
  margin-bottom: 24px;
  border-radius: 4px;

  h1 {
    margin: 0;
    font-size: 42px;
    line-height: 1.1;
  }

  p:last-child {
    max-width: 860px;
    margin: 16px 0 0;
    font-size: var(--font-size-large);
    line-height: var(--line-height-loose);
  }
}

.docs-guide-article__eyebrow {
  margin: 0 0 8px;
  color: var(--nmorph-accent-color);
  font-weight: 700;
}

.docs-guide-article__section {
  max-width: 940px;
  margin: 32px 0;

  h2 {
    margin: 0 0 12px;
    font-size: var(--font-size-extra-large);
  }

  p,
  li {
    font-size: var(--font-size-base);
    line-height: var(--line-height-loose);
  }

  p {
    margin: 0 0 12px;
  }
}

.docs-guide-article__points {
  display: grid;
  gap: 8px;
  margin: 16px 0 0;
  padding-left: 20px;
}

.docs-guide-article__code {
  max-width: 100%;
  margin-top: 16px;
  padding: 16px;
  overflow: auto;
  border-radius: 4px;
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.docs-guide-article__pager {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;

  a {
    min-height: 34px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    color: var(--nmorph-accent-color);
    font-weight: 700;
    text-decoration: none;
  }
}

@media (max-width: 720px) {
  .docs-guide-article {
    padding: 12px;
  }

  .docs-guide-article__header {
    padding: 24px;

    h1 {
      font-size: 32px;
    }
  }
}
</style>
