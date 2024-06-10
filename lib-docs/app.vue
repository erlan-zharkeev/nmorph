<template>
  <!-- <CodeBlock lang="html">{{ templateData }}</CodeBlock>
  <CodeBlock lang="javascript">{{ scriptData }}</CodeBlock>
  <CodeBlock lang="css">{{ cssData }}</CodeBlock>
  <NmorphLink :text="text" /> -->
  <!-- <TopBar /> -->
  <!-- <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </nav>
  </header> -->
  <TopBar />
  <NuxtPage>
    <NuxtLayout>
      <MainContentLayout />
    </NuxtLayout>
  </NuxtPage>
</template>

<script setup>
import CodeBlock from "~/components/CodeBlock/CodeBlock.vue";
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
import TopBar from "./components/TopBar/TopBar.vue";
import MainContentLayout from "./layouts/MainContentLayout.vue";

const text = ref("Link Two");
const scriptData = `
<script setup lang="ts">
import { ref, watch } from "vue";
import { NmorphSwitch } from "../../../library/src/components";
<\/script>
`;
const templateData = `
<template>
  <div class="top-bar">
    <div class="top-bar__pages">
      <RouterLink
        v-for="route in allRoutes"
        :key="route.path"
        :to="route.path">
        {{ route.meta.title }}
      </RouterLink>
    </div>
    <NmorphSwitch v-model="isThemeLight" />
  </div>
</template>
`;
const cssData = `
<style lang="scss">
pre {
  padding: 1em;
  background: #f5f5f5;
  border-radius: 4px;
  overflow-x: auto;
}
</style>
`;
</script>

<style lang="scss">
@import url(./assets/style/index.scss);
html {
  background: var(--main-bg-color);
  overflow: hidden;
}
</style>
