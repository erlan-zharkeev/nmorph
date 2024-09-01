<template v-if="i18nReady">
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

const { locale } = useI18n();

const i18nReady = ref(false);

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenuHandler = () => {
  menuOpen.value = false;
};

watch(locale, (newLocale, oldLocale) => {
  log("info", `Локаль изменилась с ${oldLocale} на ${newLocale}`);
  i18nReady.value = true
});

onMounted(async () => {
  log("success", `NMORPH DOCS (v${projectData.version})`);
  const url = `http://192.168.1.5:2222`;
  const code = await QRCode.toDataURL(url, { version: 2 });
  if (import.meta.dev) log("success", `Mobile dev link: ${code}`);
});
</script>

<style lang="scss">
@use "~/assets/style/index.scss";

html {
  overflow: hidden;
}
</style>
