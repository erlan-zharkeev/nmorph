<script setup lang="ts">
import { ref, watch } from "vue";
import { NmorphSwitch } from "../../../library/src/components";
import { useTheme } from "../../../library/src/hooks";
import { router } from "./../app/providers/router/index";
import { NmorphDropdown } from "../../../library/src/components";
const { isThemeLight, toggleTheme } = useTheme("dark");

const allRoutes = router.getRoutes();

const changeHandler = (v: unknown) => {
  open.value = false;
};
const open = ref(true);
const translateBtn = ref(null);
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
      :model-value="isThemeLight"
      @update:model-value="toggleTheme"
    />
  </div>
</template>

<style lang="scss" scoped>
.test-wrapper {
}
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
.click-btn {
  display: inline-flex;
}
</style>
