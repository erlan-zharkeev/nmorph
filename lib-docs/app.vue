<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
  NmorphNotificationProvider,
  nmorphLog,
  NmorphProgress,
  useNmorph,
} from "@nmorph/nmorph-ui-kit";
import { notificationProvider, useGlobalStore } from "~/providers";
import projectData from "./package.json";

const loaded = ref(false);
const store = useGlobalStore();
const route = useRoute();

const updateViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onMounted(() => {
  if (import.meta.client) {
    nmorphLog("success", `NMORPH DOCS (v${projectData.version})`);
    const nmorph = useNmorph();
    store.inferNmorphSetTheme(nmorph.theme.setTheme);
    store.changeTheme(nmorph.theme.currentTheme.value);
    store.inferGetDynamicColorVariables(nmorph.theme.getDynamicColorVariables);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
  }
  loaded.value = true;
});

onUnmounted(async () => {
  window.removeEventListener('resize', updateViewportHeight);
});

watch(() => route.path.length, () => {
  if (route.path.length <= 3) menuOpen.value = false
});
</script>

<template>
  <ClientOnly>
    <NmorphNotificationProvider :notifications="notificationProvider.notifications.value" placement="top-center" />
  </ClientOnly>
  <div class="loader" v-if="!loaded">
    <ClientOnly>
      <NmorphProgress :value-right-side="false" indeterminate color="var(--nmorph-accent-color)" />
    </ClientOnly>
  </div>
  <div v-else class="docs">
    <NuxtLayout name="default" />
  </div>
</template>

<style lang="scss">
@use "~/assets/style/index.scss";

html {
  overflow: hidden;
}

.loader {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  padding: 0 20%;
}

.docs {
  display: flex;
  flex-direction: column;
}
</style>
