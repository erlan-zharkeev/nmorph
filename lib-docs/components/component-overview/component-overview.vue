<script setup lang="ts">
import button from "~/lib-overview/button";
import icon from "~/lib-overview/icon";
import link from "~/lib-overview/link";

import { capitalizeFirstChar } from "@nmorph/nmorph-ui-kit";

interface IProps {
  name: string;
}
const props = withDefaults(defineProps<IProps>(), {});

const componentsMap: Record<string, unknown[]> = {
  button,
  icon,
  link,
};
</script>

<template>
  <div class="component-overview">
    <div class="component-overview__title nmorph-title-1">
      {{ capitalizeFirstChar(props.name) }}
    </div>
    <slot />
    <div v-for="(el, idx) in componentsMap[props.name]" :key="idx">
      <component :is="el" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-overview {
  width: 100%;
  padding: 16px;
}

.component-overview__title {
  margin-bottom: 8px;
}
</style>
