<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphComponentHeight,
} from "@nmorph/nmorph-ui-kit";

const value = ref("on");
const heights = Object.keys(NmorphComponentHeight) as Array<
  keyof typeof NmorphComponentHeight
>;
</script>

<template>
  <div class="select-button-height-overview">
    <ClientOnly>
      <NmorphSelectButton
        v-for="height in heights"
        :key="height"
        v-model="value"
        :height="height"
      >
        <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
        <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
      </NmorphSelectButton>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-button-height-overview {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
