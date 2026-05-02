<script setup lang="ts">
import { NmorphScroll, NmorphCard, NmorphDivider } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="nmorph-docs-content docs-changelog-page">
    <NmorphCard>
      <NmorphScroll class="docs-changelog-page__scroll">
        <section id="changelog">
          <h2>{{ $t("changelog-page.changelog.title") }}</h2>
          <div class="docs-changelog-page__release">
            <h3>v1.1.4</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.form-item-input-inheritance") }}</li>
              <li>{{ $t("changelog-page.changelog.items.text-input-autofill-styles") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.3</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.google-icon") }}</li>
              <li>{{ $t("changelog-page.changelog.items.contrast-text-colors") }}</li>
              <li>{{ $t("changelog-page.changelog.items.form-item-label-for") }}</li>
              <li>{{ $t("changelog-page.changelog.items.error-box-single-error") }}</li>
              <li>{{ $t("changelog-page.changelog.items.form-item-margin") }}</li>
              <li>{{ $t("changelog-page.changelog.items.css-variables-docs") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.2</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.validation-icon-fix") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.1</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.select-button-unselected-opacity") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.1.0</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.select-button") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.107</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.engines-range") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.106</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.export-en-locale") }}</li>
            </ul>
          </div>
          <div class="docs-changelog-page__release">
            <h3>v1.0.105</h3>
            <ul>
              <li>{{ $t("changelog-page.changelog.items.skeleton-animation") }}</li>
              <li>{{ $t("changelog-page.changelog.items.icon-search-and-copy") }}</li>
            </ul>
          </div>
        </section>
        <NmorphDivider />
        <section id="known-bugs">
          <h2>{{ $t("changelog-page.known-bugs.title") }}</h2>
          <ul>
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
  height: 100%;
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

  h3 {
    margin: 0 0 8px;
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
