<script setup lang="ts">
const menuOpen = ref(false);
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const closeMenuHandler = () => {
  menuOpen.value = false;
};
</script>
<template>
  <TopBar :isMenuOpen="menuOpen" @toggle-menu="toggleMenu" @close-menu="closeMenuHandler" />
  <NuxtPage />
  <FooterBar />
  <MainMenu :isMenuOpen="menuOpen" @menu-click="closeMenuHandler" />
</template>
