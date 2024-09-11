<template>
  <div class="loader" v-if="!loaded">
    <nmorph-progress
      :show-text="false"
      indeterminate
      color="var(--nmorph-accent-color)"
    />
  </div>
  <div v-else>
    <top-bar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" />
    <nuxt-page />
    <main-menu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
    <nmorph-notification-provider
      :notifications="notificationProvider.notifications.value"
      placement="top-center"
    />
  </div>
</template>

<script setup>
import QRCode from "qrcode";
import { ref, onMounted } from "vue";
import {
  NmorphNotificationProvider,
  log,
  NmorphProgress,
} from "@nmorph/nmorph-ui-kit";
import { notificationProvider } from "~/providers";
import projectData from "./package.json";

const menuOpen = ref(false);

const loaded = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenuHandler = () => {
  menuOpen.value = false;
};

onMounted(async () => {
  log("success", `NMORPH DOCS (v${projectData.version})`);
  const url = `http://192.168.1.5:2222`;
  const code = await QRCode.toDataURL(url, { version: 2 });
  if (import.meta.dev) log("success", `Mobile dev link: ${code}`);
  loaded.value = true;
});
</script>

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
</style>
