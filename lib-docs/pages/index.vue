<script setup lang="ts">
import {
  NmorphFormItem,
  NmorphTextInput,
  NmorphForm,
  NmorphButton,
  NmorphDivider,
  NmorphScroll,
} from "@nmorph/nmorph-ui-kit";
import { GetStarted } from "~/assets/images";
import { useGlobalStore } from "~/providers";

const form = reactive({
  main: { value: "#eaf2f9", rules: [] },
  text: { value: "#687b9e", rules: [] },
  accent: { value: "#006cb6", rules: [] },
});

const store = useGlobalStore();

const submitNewThemeHandler = () => {
  const newVars: { name: string; color: string }[] =
    store.getDynamicColorVariables(form.main.value);
  newVars.push({ name: "--nmorph-main-color", color: form.main.value });
  newVars.push({ name: "--nmorph-text-color", color: form.text.value });
  newVars.push({ name: "--nmorph-accent-color", color: form.accent.value });

  let styleElement = document.querySelector(
    "#nmorph-theme-styles"
  ) as HTMLStyleElement;
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = "nmorph-theme-styles";
    document.head.appendChild(styleElement);
  }
  let newStyles = `:root[nmorph-data-theme="${store.currentTheme}"] {\n`;
  newVars.forEach((el) => {
    newStyles += `  ${el.name}: ${el.color};\n`;
  });
  newStyles += `}\n`;
  styleElement.innerHTML = newStyles;
};

const installationPackageManager = `
$ npm install @nmorph/nmorph-ui-kit --save
`;

const basicUsageJS = `
  import { createApp } from "vue";
  import App from "./App.vue";
  import "@nmorph/nmorph-ui-kit/dist/style.css";
  import NmorphLibrary from "@nmorph/nmorph-ui-kit";

  createApp(App).use(NmorphLibrary).mount("#app");
`;
</script>

<template>
  <div class="docs-guide-page nmorph--shadow-outset">
    <NmorphScroll class="page">
      <section id="main" class="main-section">
        <div class="main-section__top">
          <div class="main-section__left-side">
            <div class="main-section__image-wrapper">
              <img :src="GetStarted" class="main-section__image" />
              <div class="nmorph--shadow-outset fake-btn" />
            </div>
          </div>
          <div class="main-section__right-side">
            <NmorphForm :value="form" @submit.prevent="submitNewThemeHandler">
              <h2>
                {{ $t("guide-page.theme-customize") }}
              </h2>
              <NmorphFormItem id="theme" :show-validation-icon="false">
              </NmorphFormItem>
              <NmorphFormItem id="main" :label="$t('guide-page.custom-theme-color')" :show-validation-icon="false">
                <NmorphTextInput v-model="form.main.value" :placeholder="$t('guide-page.enter-color')" />
                <color-picker v-model="form.main.value" />
              </NmorphFormItem>
              <NmorphFormItem id="text" :label="$t('guide-page.custom-text-color')" :show-validation-icon="false">
                <NmorphTextInput v-model="form.text.value" :placeholder="$t('guide-page.enter-color')" />
                <color-picker v-model="form.text.value" />
              </NmorphFormItem>
              <NmorphFormItem id="accent" :label="$t('guide-page.custom-accent-color')" :show-validation-icon="false">
                <NmorphTextInput v-model="form.accent.value" :placeholder="$t('guide-page.enter-color')" />
                <color-picker v-model="form.accent.value" />
              </NmorphFormItem>
              <NmorphFormItem :show-validation-icon="false" id="button">
                <NmorphButton type="submit">{{
                  $t("guide-page.apply-theme")
                  }}</NmorphButton>
              </NmorphFormItem>
            </NmorphForm>
          </div>
        </div>
        <div class="main-section__bottom">
          <div class="main-section__first-info">
            <h1>NMORPH</h1>
            <div v-html="$t('guide-page.explained')"></div>
            <div v-html="$t('guide-page.main-content')"></div>
          </div>
        </div>
      </section>
      <section id="quick-start" class="info-section quick-start-section">
        <NmorphDivider />
        <h2 class="section-title">{{ $t("guide-menu.quick-start") }}</h2>
        <div class="section-element nmorph--shadow-inset">
          <h3 class="section-subtitle">
            {{ $t("guide-page.quick-start.installation") }}
          </h3>
          <p class="section-paragraph" v-html="$t('guide-page.quick-start.choose-package-manager')" />
          <code-example lang="javascript">{{
            installationPackageManager
            }}</code-example>
        </div>
        <div class="section-element nmorph--shadow-inset">
          <h3 class="section-subtitle">
            {{ $t("guide-page.quick-start.usage") }}
          </h3>
          <code-example lang="javascript">{{ basicUsageJS }}</code-example>
        </div>
      </section>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
$image-size: 450px;

.docs-guide-page {
  width: calc(100% - 16px);
  margin: 8px;
  border-radius: 4px;
}

.main-section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .nmorph-radio-group__content {
    flex-wrap: nowrap;
  }

  .nmorph-button {
    margin-top: 8px;
  }

  .nmorph-radio-group,
  .nmorph-radio,
  .nmorph-button {
    width: 100%;
  }

  .main-section__top {
    display: flex;
    align-items: center;
  }

  .main-section__right-side {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-left: 8px;
  }

  .main-section__image-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: $image-size;
    height: $image-size;
  }

  .main-section__image {
    z-index: 1;
    object-fit: cover;
    scale: 0.98;
  }

  .fake-btn {
    width: 80%;
    height: 80%;
    border-radius: 16px;
  }

  .main-section__image,
  .fake-btn {
    position: absolute;
  }

  .main-section__first-info {
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 24px;
    text-align: center;
  }

  .color-picker {
    margin-left: 8px;
  }

  .nmorph-text-input {
    width: 100%;
  }

  @include max-width-query(768) {
    .main-section__right-side {
      display: none;
    }

    .main-section__image-wrapper {
      $image-size: 200px;
      width: $image-size;
      height: $image-size;
    }
  }
}

.info-section {
  padding: 16px;
}

.section-title {
  margin-top: 16px;
  margin-bottom: 16px;
}

.section-element {
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
}
</style>
