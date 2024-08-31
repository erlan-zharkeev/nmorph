<template>
  <top-bar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" />
  <nuxt-page />
  <main-menu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
  <nmorph-notification-provider
    :notifications="notificationProvider.notifications.value"
    placement="top-center"
  />
</template>

<script setup>
import QRCode from "qrcode";
import { ref, onMounted } from "vue";
import { NmorphNotificationProvider, log } from "@nmorph/nmorph-ui-kit";
import { notificationProvider } from "~/providers";
import projectData from "./package.json";

const qrcodeCanvas = ref(null);

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenuHandler = () => {
  menuOpen.value = false;
};

onMounted(async () => {
  log("success", `NMORPH DOCS (v${projectData.version})`);
  const url = `http://212.154.212.66:2222`;
  const code = await QRCode.toDataURL(url, { version: 2 });
  console.log('code for mobile', code);
});
</script>

<style lang="scss">
@use "~/assets/style/index.scss";

html {
  overflow: hidden;
}
</style>
