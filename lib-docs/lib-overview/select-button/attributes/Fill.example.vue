<script setup lang="ts">
import {
  NmorphSelectButton,
  NmorphSelectButtonItem,
} from "@nmorph/nmorph-ui-kit";

const value = ref("on");
</script>

<template>
  <div class="select-button-fill-overview">
    <NmorphSelectButton v-model="value" fill>
      <NmorphSelectButtonItem value="off">Off</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="on">On</NmorphSelectButtonItem>
      <NmorphSelectButtonItem value="auto">Auto</NmorphSelectButtonItem>
    </NmorphSelectButton>
  </div>
</template>

<style lang="scss">
.select-button-fill-overview {
  width: 100%;
}
</style>
