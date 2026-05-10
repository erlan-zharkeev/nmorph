<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-shape-overview">
    <NmorphButton>{{ $t("overview.default") }}</NmorphButton>
    <NmorphButton shape="circle" class="custom-circle-button">{{
      $t("overview.circle")
    }}</NmorphButton>
    <NmorphButton shape="round">{{ $t("overview.round") }}</NmorphButton>
    <NmorphButton shape="square" class="custom-square-button">{{
      $t("overview.square")
    }}</NmorphButton>
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
