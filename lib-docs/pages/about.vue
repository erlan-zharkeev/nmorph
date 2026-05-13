<script setup lang="ts">
import { NmorphCard, NmorphDivider, NmorphLink, NmorphScroll } from "@nmorph/nmorph-ui-kit";
import libraryData from "../../library/package.json";

const localePath = useLocalePath();
const repositoryUrl = libraryData.repository.url;
const issuesUrl = `${repositoryUrl}/-/issues`;
const featureKeys = ["components", "bundle", "theme", "nuxt", "typescript"];
const systemKeys = ["plugin", "themeEngine", "nuxtModule", "styles", "overlays", "forms", "virtualization", "accessibility"];
</script>

<template>
  <div class="nmorph-docs-content docs-about-page">
    <NmorphScroll class="docs-about-page__scroll">
      <div class="docs-about-page__content">
        <section class="docs-about-page__hero nmorph--shadow-outset">
          <p class="docs-about-page__eyebrow">{{ $t("about-page.eyebrow") }}</p>
          <h1>Nmorph UI Kit</h1>
          <p class="docs-about-page__lead">{{ $t("about-page.lead") }}</p>
          <div class="docs-about-page__meta">
            <span>{{ $t("about-page.meta.vue") }}</span>
            <span>{{ $t("about-page.meta.nuxt") }}</span>
            <span>{{ $t("about-page.meta.typescript") }}</span>
            <span>{{ $t("about-page.meta.lightweight") }}</span>
            <span>{{ $t("about-page.meta.treeShaking") }}</span>
            <span>{{ $t("about-page.meta.license") }}</span>
          </div>
        </section>

        <section class="docs-about-page__section">
          <h2>{{ $t("about-page.overview-title") }}</h2>
          <p>{{ $t("about-page.overview-content") }}</p>
        </section>

        <NmorphDivider />

        <section class="docs-about-page__section">
          <h2>{{ $t("about-page.features-title") }}</h2>
          <div class="docs-about-page__feature-grid">
            <NmorphCard v-for="featureKey in featureKeys" :key="featureKey" class="docs-about-page__feature-card">
              <h3>{{ $t(`about-page.features.${featureKey}.title`) }}</h3>
              <p>{{ $t(`about-page.features.${featureKey}.text`) }}</p>
            </NmorphCard>
          </div>
        </section>

        <NmorphDivider />

        <section class="docs-about-page__section">
          <h2>{{ $t("about-page.system-title") }}</h2>
          <div class="docs-about-page__system-grid">
            <div v-for="systemKey in systemKeys" :key="systemKey" class="docs-about-page__system-item">
              <h3>{{ $t(`about-page.system.${systemKey}.title`) }}</h3>
              <p>{{ $t(`about-page.system.${systemKey}.text`) }}</p>
            </div>
          </div>
        </section>

        <NmorphDivider />

        <section class="docs-about-page__section docs-about-page__text-grid">
          <div>
            <h2>{{ $t("about-page.design-title") }}</h2>
            <p>{{ $t("about-page.design-content") }}</p>
          </div>
          <div>
            <h2>{{ $t("about-page.status-title") }}</h2>
            <p>{{ $t("about-page.status-content") }}</p>
          </div>
        </section>

        <NmorphDivider />

        <section class="docs-about-page__section">
          <h2>{{ $t("about-page.links-title") }}</h2>
          <div class="docs-about-page__links">
            <NuxtLink :to="localePath('/guide')">{{ $t("about-page.links.guide") }}</NuxtLink>
            <NuxtLink :to="localePath('/components')">{{ $t("about-page.links.components") }}</NuxtLink>
            <NuxtLink :to="localePath('/changelog')">{{ $t("about-page.links.changelog") }}</NuxtLink>
            <NmorphLink :href="repositoryUrl" target="blank">
              {{ $t("about-page.links.repository") }}
            </NmorphLink>
            <NmorphLink :href="issuesUrl" target="blank">
              {{ $t("about-page.links.issues") }}
            </NmorphLink>
          </div>
        </section>
      </div>
    </NmorphScroll>
  </div>
</template>

<style scoped lang="scss">
.docs-about-page {
  width: calc(100% - 16px);
  border-radius: 4px;
  overflow: hidden;
}

.docs-about-page__scroll {
  height: 100% !important;
}

.docs-about-page__content {
  padding: 24px 32px 24px 24px;
  box-sizing: border-box;
}

.docs-about-page__hero {
  padding: 32px;
  border-radius: 4px;
  margin-bottom: 24px;
}

.docs-about-page__eyebrow {
  margin: 0 0 8px;
  color: var(--nmorph-accent-color);
  font-weight: 700;
}

.docs-about-page {
  h1 {
    margin: 0;
    font-size: 44px;
    line-height: 1.1;
  }

  h2,
  h3,
  p {
    margin: 0;
  }

  h2 {
    margin-bottom: 12px;
    font-size: var(--font-size-extra-large);
  }

  h3 {
    margin-bottom: 8px;
    font-size: var(--font-size-medium);
  }

  p {
    line-height: 1.7;
  }
}

.docs-about-page__lead {
  max-width: 900px;
  margin-top: 16px;
  font-size: var(--font-size-large);
}

.docs-about-page__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;

  span {
    padding: 8px 12px;
    border-radius: 4px;
    font-size: var(--font-size-small);
    font-weight: 700;
    color: var(--nmorph-accent-color);
    background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
  }
}

.docs-about-page__section {
  margin: 24px 0;
}

.docs-about-page__feature-grid,
.docs-about-page__system-grid,
.docs-about-page__text-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.docs-about-page__feature-card {
  padding: 16px;
}

.docs-about-page__system-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.docs-about-page__system-item {
  padding: 16px;
  border-radius: 4px;
  box-shadow:
    inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
    inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
      var(--nmorph-light-shade-color);
}

.docs-about-page__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  a,
  :deep(.nmorph-link a) {
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    padding: 0 12px;
    border-radius: 4px;
    color: var(--nmorph-accent-color);
    font-weight: 700;
    text-decoration: none;
  }
}

@media (max-width: 720px) {
  .docs-about-page__content {
    padding: 16px 24px 16px 16px;
  }

  .docs-about-page__hero {
    padding: 24px;
  }

  .docs-about-page {
    h1 {
      font-size: 34px;
    }
  }

  .docs-about-page__feature-grid,
  .docs-about-page__system-grid,
  .docs-about-page__text-grid {
    grid-template-columns: 1fr;
  }
}
</style>
