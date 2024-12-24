<script lang="ts" setup>
import {
  NmorphSwitch,
  NmorphRadioGroup,
  NmorphIcon,
} from "@nmorph/nmorph-ui-kit";
import MoonIcon from "~/assets/icons/moon.svg";
import SunIcon from "~/assets/icons/sun.svg";
import { useGlobalStore } from "~/providers";

interface IProps {
  switchType?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  switchType: true,
});

const store = useGlobalStore();
</script>
<template>
  <NmorphSwitch
    v-if="props.switchType"
    :model-value="store.currentTheme"
    @update:model-value="$event => store.changeTheme($event as string)"
    active-value="light"
    inactive-value="dark"
    class="theme-changer"
  >
    <template #thumb-on>
      <ClientOnly>
        <NmorphIcon width="10px" height="10px">
          <SunIcon class="sun-icon" />
        </NmorphIcon>
      </ClientOnly>
    </template>
    <template #thumb-off>
      <ClientOnly>
        <NmorphIcon width="10px" height="10px"> <MoonIcon /> </NmorphIcon>
      </ClientOnly>
    </template>
  </NmorphSwitch>
  <NmorphRadioGroup
    v-else
    :model-value="store.currentTheme"
    @update:model-value="store.changeTheme"
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
