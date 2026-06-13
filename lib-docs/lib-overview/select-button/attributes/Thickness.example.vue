<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
  NmorphComponentThickness,
} from "@nmorph/nmorph-ui-kit";

const value = ref("on");
const thicknesses = Object.keys(NmorphComponentThickness) as Array<
  keyof typeof NmorphComponentThickness
>;
</script>

<template>
  <div class="select-button-thickness-overview">
    <NmorphSelectButton
      v-for="thickness in thicknesses"
      :key="thickness"
      v-model="value"
      :thickness="thickness"
    >
      <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
    </NmorphSelectButton>
    <NmorphSelectButton v-model="value" custom-thickness="44px">
      <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="on">Custom</NmorphSelectButtonItem>
    </NmorphSelectButton>
  </div>
</template>

<style lang="scss">
.select-button-thickness-overview {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
