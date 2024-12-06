<script setup lang="ts">
import { NmorphSwitch, useNmorph } from "@nmorph/nmorph-ui-kit";
import { router } from "source/providers/router";

const nmorph = useNmorph();

const allRoutes = router.getRoutes();

const updateTheme = (value: string | number | boolean) => {
  const theme = value as string
  nmorph.theme.setTheme(theme)
}
</script>
<template>
  <div class="top-bar">
    <div class="top-bar__pages">
      <RouterLink v-for="route in allRoutes" :key="route.path" :to="route.path">{{ route.meta.title }}</RouterLink>
    </div>
    <NmorphSwitch :model-value="nmorph.theme.currentTheme.value" @update:model-value="updateTheme" active-value="dark"
      inactive-value="light" />
  </div>
</template>

<style>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

a {
  margin: 0 8px;
  text-decoration: none;
}

.click-btn {
  display: inline-flex;
}
</style>
