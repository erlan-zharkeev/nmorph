<template>
  <TopBar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" />
  <NuxtPage />
  <main-menu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
</template>

<script setup>
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
  background: var(--main-bg-color);
  overflow: hidden;
}
</style>
