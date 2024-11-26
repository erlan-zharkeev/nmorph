<script setup>
import { NmorphScroll, NmorphLink, NmorphButton } from "@nmorph/nmorph-ui-kit";
import { ref, onMounted } from "vue";
</script>

<template>
  <div class="page docs-about-page">
    <NmorphScroll class="docs-about-page__scroll">
      <NmorphCard>
        <!-- <header>
          <h1>Nmorph</h1>
          <p>
            {{ $t("about-page.light-weight") }}
          </p>
          <p>Nmorph - {{ $t("about-page.overview-content") }}</p>
          <NmorphButton
            :text="$t('about-page.get-started')"
            class="get-started-btn"
          />
        </header> -->
        <!-- <section id="features">
          <h2>Особенности</h2>
          <ul>
            <li>Поддержка Vue 3 и Composition API</li>
            <li>Нейморфический дизайн</li>
            <li>Легкая настройка и интеграция</li>
            <li>Полностью настраиваемые компоненты</li>
          </ul>
        </section> -->

        <section id="status">
          <h2>{{ $t("about-page.alpha-test") }}</h2>
          <div v-html="$t('about-page.alpha-test-lib')" />
          <span>
            <NmorphLink
              href="https://gitlab.com/ketjo/nmorph/-/issues"
              target="blank"
              >GIT LAB Issues</NmorphLink
            >.
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
