<script lang="ts" setup>
import {
  NmorphSwitch,
  NmorphRadioGroup,
  NmorphIcon,
  useNmorph,
} from "@nmorph/nmorph-ui-kit";
import MoonIcon from "~/assets/icons/moon.svg";
import SunIcon from "~/assets/icons/sun.svg";

interface IProps {
  switchType?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  switchType: true,
});

const nmorph = useNmorph();
const currentTheme = nmorph.theme.currentTheme;
const changeTheme = (theme: string) => nmorph.theme.setTheme(theme);
const isHydrated = ref(false);
const currentThemeModel = computed({
  get: () => currentTheme.value,
  set: (value) => changeTheme(String(value)),
});

onMounted(() => {
  const documentTheme =
    document.documentElement.getAttribute("nmorph-data-theme");

  if (documentTheme === "dark" || documentTheme === "light") {
    changeTheme(documentTheme);
  }

  isHydrated.value = true;
});
</script>
<template>
  <NmorphSwitch
    v-if="props.switchType"
    v-model="currentThemeModel"
    active-value="light"
    inactive-value="dark"
    :loading="!isHydrated"
    :disabled="!isHydrated"
    class="theme-changer"
  >
    <template #thumb-on>
      <NmorphIcon width="10px" height="10px">
        <SunIcon class="sun-icon" />
      </NmorphIcon>
    </template>
    <template #thumb-off>
      <NmorphIcon width="10px" height="10px"> <MoonIcon /> </NmorphIcon>
    </template>
  </NmorphSwitch>
  <NmorphRadioGroup
    v-else
    v-model="currentThemeModel"
    :options="[
      { value: 'dark', label: 'Dark' },
      { value: 'light', label: 'Light' },
    ]"
  />
</template>

<style lang="scss">
.theme-changer {
  margin-right: 12px;

  .sun-icon {
    margin-top: 1px;
  }
}
</style>
