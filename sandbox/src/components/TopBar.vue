<script setup lang="ts">
import { NmorphSwitch } from "../../../library/src/components";
import { useNmorph } from "../../../library/src/providers";
import { router } from "./../app/providers/router/index";

const nmorph = useNmorph();

const allRoutes = router.getRoutes();
console.log(nmorph.theme.currentTheme.value);
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
    <NmorphSwitch
      :model-value="nmorph.theme.currentTheme.value"
      @update:model-value="nmorph.theme.setTheme"
      active-value="dark"
      inactive-value="light"
    />
  </div>
</template>

<style lang="scss" scoped>
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
