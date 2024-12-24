<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Info from '~/components/info/Info.vue';

const { t } = useI18n();

const config = `
import { createApp } from "vue";
import App from "./App.vue";
import NmorphLibrary from "@nmorph/nmorph-ui-kit";
const app = createApp(App);

const config = { theme: {...}, i18n: {...} };

app.use(NmorphLibrary, config);
app.mount("#app");
`;

const theme = `
const config = {
  theme: {
    themes: {
      dark: {
        main: '#1c1f21', // String(hex color) // ${t('guide-page.config.main-var')}
        darkShade: '#0f1112', // String(hex color) // ${t('guide-page.config.shade-var')}
        lightShade: '#292d30', // String(hex color) // ${t('guide-page.config.shade-var')}
        text: '#778288', // String(hex color)
        accent: '#006cb6', // String(hex color)
        focusText: '#ffffff', // String(hex color)
        placeholderText: '#575757', // String(hex color)
        info: '#d4e5edbb', // String(hex color)
        infoText: '#506c80', // String(hex color)
        success: '#67C23A', // String(hex color)
        successText: '#0b5b1d', // String(hex color)
        error: '#F56C6C', // String(hex color)
        errorText: '#8d3333', // String(hex color)
        warn: '#E6A21C', // String(hex color)
        warnText: '#7a6712', // String(hex color)
        gray: '#c9d2dee6', // String(hex color)
        white: '#ffffff', // String(hex color)
        black: '#000000', // String(hex color)
        overlay: '#00000095' // String(hex color)
      },
      light: {...}
      ... // ${t('guide-page.config.rest-themes')}
    },
    defaultTheme: 'dark', // String // ${t('guide-page.config.default-theme')}
    saveCurrentThemeToLS: true, // Boolean // ${t('guide-page.config.ls')}
    darkShadeGeneratorCoefficient: -45, // Number; // ${t('guide-page.config.dark-shade')}
    lightShadeGeneratorCoefficient: 45, // Number; // ${t('guide-page.config.light-shade')}
    other: {
      baseShadowWidth: '3.5px', // String // ${t('guide-page.config.shadow-width')}
      baseShadowBlurCoefficient: '2', // String // ${t('guide-page.config.shadow-blur')}
    },
  }
};
`;

const i18n = `
import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import { NmorphLibrary, ru, zh } from "@nmorph/nmorph-ui-kit";
import 'source/style.css';

const i18nApp = createI18n({
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false,
  messages: {
    ru: {
      loadingText: 'Загружаю что-то...', // ${t('guide-page.config.rewrite-translation')}
      ... // ${t('guide-page.config.other-messages')}
    },
    en: {
      loadingText: 'Loading something...', // ${t('guide-page.config.rewrite-translation')}
      ... // ${t('guide-page.config.other-messages')}
    },
  },
});

const nmorphOptions = { i18n: { messages: { ru, zh }, locale: "en" } };

const app = createApp(App);
app.use(i18nApp);
app.use(NmorphLibrary, nmorphOptions);
app.mount("#app");
`;

</script>

<template>
  <section>
    <h2 class="section-title">{{ $t("guide-menu.config") }}</h2>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.config.add-config") }}
      </h3>
      <p class="section-paragraph" v-html="$t('guide-page.config.available')" />
      <code-example lang="javascript">{{
        config
        }}</code-example>
    </div>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.config.theme") }}
      </h3>
      <p class="section-paragraph" v-html="$t('guide-page.config.theme-explained')" />
      <Info type='warning' :title="$t('attention')" :content="$t('guide-page.config.auto-generation')" />
      <code-example lang="javascript">{{
        theme
        }}</code-example>
    </div>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.config.i18n") }}
      </h3>
      <p class="section-paragraph" v-html="$t('guide-page.config.i18n-content')" />
      <code-example lang="javascript">{{
        i18n
        }}</code-example>
    </div>
  </section>
</template>
