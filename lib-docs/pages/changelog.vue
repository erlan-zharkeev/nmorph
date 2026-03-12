<script setup lang="ts">
import { NmorphScroll, NmorphCard, NmorphDivider } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="nmorph-docs-content docs-changelog-page">
    <NmorphCard>
      <NmorphScroll class="docs-changelog-page__scroll">
        <section id="changelog">
          <h2>{{ $t("changelog-page.changelog.title") }}</h2>
          <ul>
            <li>{{ $t("changelog-page.changelog.items.skeleton-animation") }}</li>
          </ul>
        </section>
        <NmorphDivider />
        <section id="known-bugs">
          <h2>{{ $t("changelog-page.known-bugs.title") }}</h2>
          <ul>
            <li>{{ $t("changelog-page.known-bugs.items.translation") }}</li>
            <li>{{ $t("changelog-page.known-bugs.items.input-clearable") }}</li>
            <li>{{ $t("changelog-page.known-bugs.items.mobile-slider") }}</li>
          </ul>
        </section>
        <NmorphDivider />
        <section id="roadmap">
          <h2>{{ $t("changelog-page.roadmap.title") }}</h2>
          <ul>
            <li>{{ $t("changelog-page.roadmap.items.nuxt-support") }}</li>
            <li>{{ $t("changelog-page.roadmap.items.storybook-vr") }}</li>
            <li>{{ $t("changelog-page.roadmap.items.accessibility") }}</li>
            <li>{{ $t("changelog-page.roadmap.items.test-coverage") }}</li>
            <li>{{ $t("changelog-page.roadmap.items.theming-v2") }}</li>
            <li>{{ $t("changelog-page.roadmap.items.performance") }}</li>
          </ul>
        </section>
      </NmorphScroll>
    </NmorphCard>
  </div>
</template>

<style scoped lang="scss">
.docs-changelog-page__scroll {
  padding: 4px;
  height: 100% !important;
}

.nmorph-card {
  height: 100%;
}

.docs-changelog-page {
  section {
    margin: 24px 0;
  }

  h2 {
    margin-bottom: 10px;
  }

  p,
  li {
    line-height: 1.5;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }
}
</style>
