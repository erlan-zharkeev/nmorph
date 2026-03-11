<script setup lang="ts">
import { NmorphButton, NmorphCard } from "@nmorph/nmorph-ui-kit";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const setLocale = (nextLocale: "en" | "ru") => {
  locale.value = nextLocale;
};
</script>

<template>
  <main class="sandbox-page">
    <NmorphCard class="sandbox-card">
      <h1>{{ t("title") }}</h1>
      <p>{{ t("description") }}</p>

      <div class="lang-controls">
        <p class="lang-title">{{ t("languageTitle") }}:</p>
        <div class="lang-buttons">
          <NmorphButton :text="t('langEn')" @click="setLocale('en')" />
          <NmorphButton :text="t('langRu')" @click="setLocale('ru')" />
        </div>
        <p>{{ t("currentLanguage") }}: {{ locale }}</p>
      </div>

      <NmorphButton text="Test Nmorph Button" class="sandbox-page__test-btn" />
    </NmorphCard>
  </main>
</template>

<style scoped>
.sandbox-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
}

.sandbox-card {
  width: min(560px, 100%);
  padding: 24px;
  display: grid;
  gap: 12px;
}

.lang-controls {
  display: grid;
  gap: 10px;
}

.lang-title {
  font-weight: 600;
}

.lang-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

h1,
p {
  margin: 0;
}

.sandbox-page__test-btn {
  margin-top: 8px;
}
</style>
