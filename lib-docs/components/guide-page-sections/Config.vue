<script setup lang="ts">
import { NmorphCallout } from '@nmorph/nmorph-ui-kit';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const config = `
import { createApp } from "vue";
import App from "./App.vue";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit/plugin";
const app = createApp(App);

const config = { theme: {...}, i18n: {...}, zIndex: { base: 1000 } };

app.use(NmorphLibrary, config);
app.mount("#app");
`;

const theme = `
const config = {
  theme: {
    defaultTheme: 'dark',
    saveCurrentThemeToLS: true,
    themes: {
      light: {
        main: '#e9ecec',
        text: '#687b9e',
        accent: '#4a90e2',
      },
      dark: {
        main: '#1c1f21',
        text: '#778288',
        accent: '#006cb6',
      },
    },
    darkShadeGeneratorCoefficient: -45,
    lightShadeGeneratorCoefficient: 45,
    other: {
      baseShadowWidth: '3.5px',
      baseShadowBlurCoefficient: '2',
    },
  }
};
`;

const runtimeTheme = `
const nmorph = useNmorph();

nmorph.theme.setTheme('dark');

nmorph.theme.setThemeColors('dark', {
  main: '#20242a',
  accent: '#ff5a7a',
});

nmorph.theme.applyTheme('light', {
  accent: '#4a90e2',
});
`;

const i18n = `
import { createApp } from "vue";
import App from "./App.vue";
import { createI18n } from "vue-i18n";
import { NmorphLibrary, ru, zh } from "@nmorph/nmorph-ui-kit/plugin";

const i18nApp = createI18n({
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false,
  messages: {
    ru: {
      loadFailedText: 'Не удалось загрузить...', // ${t('guide-page.config.rewrite-translation')}
      ... // ${t('guide-page.config.other-messages')}
    },
    en: {
      loadFailedText: 'Failed to load something...', // ${t('guide-page.config.rewrite-translation')}
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

const cssVariableGroups = computed(() => [
  {
    title: t('guide-page.config.css-variables-theme-derived'),
    variables: [
      { name: '--nmorph-main-color', description: t('guide-page.config.css-var-main') },
      { name: '--nmorph-dark-shade-color', description: t('guide-page.config.css-var-dark-shade') },
      { name: '--nmorph-light-shade-color', description: t('guide-page.config.css-var-light-shade') },
      { name: '--nmorph-text-color', description: t('guide-page.config.css-var-text') },
      { name: '--nmorph-scroll-thumb-color', description: t('guide-page.config.css-var-scroll-thumb') },
      { name: '--nmorph-scroll-color-scheme', description: t('guide-page.config.css-var-scroll-color-scheme') },
      { name: '--nmorph-accent-color', description: t('guide-page.config.css-var-accent') },
      { name: '--nmorph-focus-text-color', description: t('guide-page.config.css-var-focus-text') },
      { name: '--nmorph-placeholder-text-color', description: t('guide-page.config.css-var-placeholder') },
      { name: '--nmorph-semi-contrast-text-color', description: t('guide-page.config.css-var-semi-contrast') },
      { name: '--nmorph-contrast-text-color', description: t('guide-page.config.css-var-contrast') },
    ],
  },
  {
    title: t('guide-page.config.css-variables-static'),
    variables: [
      { name: '--nmorph-success-color', description: 'Success state color' },
      { name: '--nmorph-success-text-color', description: 'Success text color' },
      { name: '--nmorph-error-color', description: 'Error state color' },
      { name: '--nmorph-error-text-color', description: 'Error text color' },
      { name: '--nmorph-warn-color', description: 'Warning state color' },
      { name: '--nmorph-warn-text-color', description: 'Warning text color' },
      { name: '--nmorph-info-color', description: 'Info state color' },
      { name: '--nmorph-info-text-color', description: 'Info text color' },
      { name: '--nmorph-gray-color', description: 'Neutral gray color' },
      { name: '--nmorph-white-color', description: 'White color token' },
      { name: '--nmorph-black-color', description: 'Black color token' },
      { name: '--nmorph-overlay-color', description: 'Overlay background color' },
    ],
  },
  {
    title: 'Typography',
    variables: [
      { name: '--font-size-tiny', description: 'Tiny text size' },
      { name: '--font-size-extra-small', description: 'Extra small text size' },
      { name: '--font-size-small', description: 'Small text size' },
      { name: '--font-size-base', description: 'Base text size' },
      { name: '--font-size-medium', description: 'Medium title text size' },
      { name: '--font-size-large', description: 'Large title text size' },
      { name: '--font-size-extra-large', description: 'Extra large title text size' },
      { name: '--line-height-line', description: 'Single-line height' },
      { name: '--line-height-compact', description: 'Compact text line height' },
      { name: '--line-height-regular', description: 'Regular text line height' },
      { name: '--line-height-loose', description: 'Loose title line height' },
    ],
  },
  {
    title: 'Radius and sizing',
    variables: [
      { name: '--border-radius-none', description: 'No border radius' },
      { name: '--border-radius-20', description: '2px border radius' },
      { name: '--border-radius-40', description: '4px border radius' },
      { name: '--border-radius-60', description: '6px border radius' },
      { name: '--border-radius-80', description: '8px border radius' },
      { name: '--border-radius-120', description: '12px border radius' },
      { name: '--border-radius-200', description: '20px border radius' },
      { name: '--border-radius-999', description: 'Pill border radius' },
      { name: '--border-radius-circular', description: 'Circular border radius' },
      { name: '--default-border-radius', description: 'Default component border radius' },
      { name: '--thick-component', description: 'Thick component height' },
      { name: '--basic-component', description: 'Basic component height' },
      { name: '--thin-component', description: 'Thin component height' },
      { name: '--extra-thin-component', description: 'Extra thin component height' },
      { name: '--default-thickness-component', description: 'Legacy alias for --basic-component' },
      { name: '--form-container', description: 'Default form control width' },
    ],
  },
  {
    title: 'Spacing, shadows and motion',
    variables: [
      { name: '--indentation-00', description: 'Zero spacing token' },
      { name: '--indentation-01', description: '2px spacing token' },
      { name: '--indentation-02', description: '4px spacing token' },
      { name: '--indentation-03', description: '8px spacing token' },
      { name: '--indentation-04', description: '16px spacing token' },
      { name: '--default-indentation-input', description: 'Default input inner indentation' },
      { name: '--base-shadow-width', description: 'Base neumorphic shadow distance' },
      { name: '--base-shadow-blur-coefficient', description: 'Base shadow blur multiplier' },
      { name: '--base-shadow-blur', description: 'Calculated base shadow blur' },
      { name: '--nmorph-wrapper-padding', description: 'Wrapper padding derived from shadow width' },
      { name: '--transition-01', description: 'Fastest transition duration' },
      { name: '--transition-02', description: 'Fast transition duration' },
      { name: '--transition-03', description: 'Default transition duration' },
      { name: '--transition-04', description: 'Slow transition duration' },
    ],
  },
]);

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
      <NmorphCallout type='warning' :title="$t('attention')" :content="$t('guide-page.config.auto-generation')" />
      <code-example lang="javascript">{{
        theme
      }}</code-example>
      <p class="section-paragraph" v-html="$t('guide-page.config.theme-runtime')" />
      <code-example lang="javascript">{{
        runtimeTheme
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
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.config.css-variables") }}
      </h3>
      <p class="section-paragraph" v-html="$t('guide-page.config.css-variables-content')" />
      <div class="docs-css-variable-groups">
        <div v-for="group in cssVariableGroups" :key="group.title" class="docs-css-variable-group">
          <h4 class="docs-css-variable-group__title nmorph-title-3">{{ group.title }}</h4>
          <dl class="docs-token-list">
            <div v-for="variable in group.variables" :key="variable.name" class="docs-token-list__row">
              <dt><code>{{ variable.name }}</code></dt>
              <dd>{{ variable.description }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.docs-css-variable-groups {
  display: grid;
  gap: 16px;
}

.docs-css-variable-group__title {
  margin-bottom: 8px;
}

.docs-token-list {
  display: grid;
  gap: 6px;
  margin: 0;
}

.docs-token-list__row {
  display: grid;
  grid-template-columns: minmax(0, 42%) minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}

.docs-token-list dt,
.docs-token-list dd {
  min-width: 0;
  margin: 0;
  overflow-wrap: anywhere;
}

.docs-token-list code {
  white-space: normal;
  word-break: break-word;
}

@include max-width-query(768) {
  .docs-token-list__row {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
