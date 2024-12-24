<script setup>
import { NmorphScroll, NmorphLink, NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="nmorph-docs-content docs-about-page nmorph-docs-content">
    <NmorphScroll class="docs-about-page__scroll">
      <NmorphCard>
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
      </NmorphCard>
    </NmorphScroll>
  </div>
</template>

<style scoped lang="scss">
.docs-about-page__scroll {
  padding: 4px;
  height: 100%;
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
}
</style>
