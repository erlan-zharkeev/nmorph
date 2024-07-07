<template>
  <top-bar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" />
  <nuxt-page />
  <main-menu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
</template>

<script setup>
// import "~/plugins/nmorph";
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
  // background: var(--nmorph-main-color);
  overflow: hidden;
}
</style>
