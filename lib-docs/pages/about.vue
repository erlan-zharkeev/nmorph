<script setup lang="ts">
import { NmorphScroll, NmorphLink, NmorphCard } from "@nmorph/nmorph-ui-kit";
import projectData from "./../package.json";

</script>

<template>
  <div class="nmorph-docs-content docs-about-page">
    <NmorphCard>
      <NmorphScroll class="docs-about-page__scroll ">
        <section id="nmorph">
          <h2>NMORPH</h2>
          <div v-html="$t('about-page.overview-content')" />
        </section>
        <section id="status">
          <h2>{{ $t("about-page.alpha-test") }}</h2>
          <div v-html="$t('about-page.alpha-test-lib')" />
          <span>
            <NmorphLink href="https://gitlab.com/ketjo/nmorph/-/issues" target="blank">GIT LAB Issues</NmorphLink>.
          </span>
        </section>
        <section id="neumorphism">
          <h2>{{ $t("about-page.neumorphism") }}</h2>
          <div v-html="$t('about-page.neumorphism-content')" />
        </section>
        <p class="docs-about-page__version"> Docs version: {{ projectData.version }}
        </p>
      </NmorphScroll>
    </NmorphCard>
  </div>
</template>

<style scoped lang="scss">
.docs-about-page__scroll {
  padding: 4px;
  height: 100% !important;
}

.nmorph-card {
  height: 100%;
}

.docs-about-page {
  header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    max-width: 300px;
  }

  p {
    white-space: wrap;
  }

  section {
    margin-bottom: 16px;
  }

  .get-started-btn {
    margin-top: 16px;
  }

  .docs-about-page__version {
    font-weight: 600;
  }
}
</style>
