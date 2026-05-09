<script setup lang="ts">
const installationPackageManager = `
npm install @nmorph/nmorph-ui-kit --save
yarn add @nmorph/nmorph-ui-kit --save
pnpm install @nmorph/nmorph-ui-kit --save
`;

const basicUsageJS = `
import { createApp } from "vue";
import App from "./App.vue";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit/plugin";

createApp(App).use(NmorphLibrary).mount("#app");
`;

const alternativePlugin = `
import { createApp } from "vue";
import App from "./App.vue";
import { NmorphLibrary } from "@nmorph/nmorph-ui-kit/plugin";

const app = createApp(App);
app.use(NmorphLibrary);
app.mount("#app");
`

const nuxtUsage = `
export default defineNuxtConfig({
  modules: ["@nmorph/nmorph-ui-kit/nuxt"],
  nmorph: {
    theme: {
      defaultTheme: "dark",
    },
  },
});
`

const usage = `
<script setup lang="ts">
import NmorphButton from "@nmorph/nmorph-ui-kit/components/basic/nmorph-button/NmorphButton.vue";
<\/script>

<template>
  <NmorphButton text="Lorem ipsum" />
</template>
`
</script>

<template>
  <section>
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
        {{ $t("guide-page.quick-start.plugin") }}
      </h3>
      <code-example lang="javascript">{{ basicUsageJS }}</code-example>
    </div>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-title">{{ $t("guide-page.quick-start.alternative-plugin") }}</h3>
      <code-example lang="javascript">{{ alternativePlugin }}</code-example>
    </div>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.quick-start.nuxt") }}
      </h3>
      <code-example lang="javascript">{{ nuxtUsage }}</code-example>
    </div>
    <div class="section-element nmorph--shadow-inset">
      <h3 class="section-subtitle">
        {{ $t("guide-page.quick-start.usage") }}
      </h3>
      <code-example lang="javascript">{{ usage }}</code-example>
    </div>
  </section>
</template>
