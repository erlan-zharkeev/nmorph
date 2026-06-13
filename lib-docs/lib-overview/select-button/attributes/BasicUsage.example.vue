<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
} from "@nmorph/nmorph-ui-kit";

const value = ref("on");
const options = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
];
</script>

<template>
  <div class="select-button-basic-overview">
    <NmorphSelectButton v-model="value" :options="options" />
    <NmorphSelectButton v-model="value">
      <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
    </NmorphSelectButton>
  </div>
</template>

<style lang="scss">
.select-button-basic-overview {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
