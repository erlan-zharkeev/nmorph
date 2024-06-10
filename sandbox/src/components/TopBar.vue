<script setup lang="ts">
import { ref, watch } from "vue";
import { NmorphSwitch } from "../../../library/src/components";

import { router } from "./../app/providers/router/index";
const allRoutes = router.getRoutes();

const isThemeLight = ref(false);
const html = document.querySelector("html");

watch(
  isThemeLight,
  (newValue) => {
    if (!newValue) {
      html?.setAttribute("data-theme", "dark");
    } else {
      html?.removeAttribute("data-theme");
    }
  },
  { immediate: true }
);
</script>
<template>
  <div class="top-bar">
    <div class="top-bar__pages">
      <RouterLink
        v-for="route in allRoutes"
        :key="route.path"
        :to="route.path"
        >{{ route.meta.title }}</RouterLink
      >
    </div>
    <NmorphSwitch v-model="isThemeLight" />
  </div>
</template>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--main-bg-color);
  padding: 10px;
}

a {
  margin: 0 8px;
  text-decoration: none;
}
</style>
