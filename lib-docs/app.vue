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
import { NmorphNotificationProvider } from "@nmorph/nmorph-ui-kit";
import { notificationProvider } from "~/providers";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenuHandler = () => {
  menuOpen.value = false;
};
</script>

<style lang="scss">
@use "~/assets/style/index.scss";

html {
  overflow: hidden;
}
</style>
