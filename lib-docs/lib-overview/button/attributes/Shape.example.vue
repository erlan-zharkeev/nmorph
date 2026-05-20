<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-shape-overview">
    <NmorphButton>Default</NmorphButton>
    <NmorphButton shape="circle" class="custom-circle-button"
      >Circle</NmorphButton
    >
    <NmorphButton shape="round">Round</NmorphButton>
    <NmorphButton shape="square" class="custom-square-button"
      >Square</NmorphButton
    >
  </div>
</template>

<style lang="scss">
.button-shape-overview {
  .nmorph-button {
    margin: 4px 8px;
  }

  .custom-circle-button {
    --height: 50px;
  }

  .custom-square-button {
    --height: 70px;
  }
}
</style>
