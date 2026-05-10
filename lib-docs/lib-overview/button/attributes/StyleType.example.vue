<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-type-overview">
    <NmorphButton style-type="default">{{
      $t("overview.default")
    }}</NmorphButton>
    <NmorphButton style-type="transparent">{{
      $t("overview.transparent")
    }}</NmorphButton>
    <NmorphButton style-type="transparent" color="var(--nmorph-accent-color)">{{
      $t("overview.edit")
    }}</NmorphButton>
  </div>
</template>

<style lang="scss">
.button-type-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
