<script setup>
import QRCode from "qrcode";
import { ref, onMounted } from "vue";
import {
  NmorphNotificationProvider,
  nmorphLog,
  NmorphProgress,
  useNmorph,
} from "@nmorph/nmorph-ui-kit";
import { notificationProvider, useGlobalStore } from "~/providers";
import projectData from "./package.json";

const menuOpen = ref(false);

const loaded = ref(false);
const store = useGlobalStore();

onMounted(() => {
  if (import.meta.client) {
    const nmorph = useNmorph();
    store.inferNmorphSetTheme(nmorph.theme.setTheme);
    store.changeTheme(nmorph.theme.currentTheme.value);
    store.inferGetDynamicColorVariables(nmorph.theme.getDynamicColorVariables);
  }
});

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenuHandler = () => {
  menuOpen.value = false;
};

onMounted(async () => {
  nmorphLog("success", `NMORPH DOCS (v${projectData.version})`);
  const url = `http://192.168.1.5:2222`;
  const code = await QRCode.toDataURL(url, { version: 2 });
  if (import.meta.dev) nmorphLog("success", `Mobile dev link: ${code}`);
  loaded.value = true;
});
</script>

<template>
  <div class="loader" v-if="!loaded">
    <nmorph-progress
      :value-right-side="false"
      indeterminate
      color="var(--nmorph-accent-color)"
    />
  </div>
  <div v-else class="docs">
    <top-bar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" />
    <nuxt-page />
    <footer-bar />
    <main-menu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
    <nmorph-notification-provider
      :notifications="notificationProvider.notifications.value"
      placement="top-center"
    />
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
