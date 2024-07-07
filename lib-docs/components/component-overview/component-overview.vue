<script setup lang="ts">
import button from "~/lib-overview/button";
import icon from "~/lib-overview/icon";
import { capitalizeFirstChar } from "@nmorph/nmorph-ui-kit";

interface IProps {
  name: string;
}
const props = withDefaults(defineProps<IProps>(), {});

const componentsMap: Record<string, unknown[]> = {
  button,
  icon,
};
</script>

<template>
  <div class="component-overview">
    <div class="component-overview__title nmorph-title-2">
      {{ capitalizeFirstChar(props.name) }}
    </div>
    <div v-for="(el, idx) in componentsMap[props.name]" :key="idx">
      <component :is="el" />
    </div>
  </div>
</template>

<style lang="scss">
.component-overview {
  width: 100%;
  padding: 16px;
}
</style>
