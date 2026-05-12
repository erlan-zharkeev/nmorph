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
</script>
<template>
  <ClientOnly>
    <NmorphSwitch
      v-if="props.switchType"
      :model-value="currentTheme"
      @update:model-value="$event => changeTheme($event as string)"
      active-value="light"
      inactive-value="dark"
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
      :model-value="currentTheme"
      @update:model-value="changeTheme"
      :options="[
        { value: 'dark', label: 'Dark' },
        { value: 'light', label: 'Light' },
      ]"
    />
  </ClientOnly>
</template>

<style lang="scss">
.theme-changer {
  margin-right: 12px;
  .sun-icon {
    margin-top: 1px;
  }
}
</style>
