<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-height-overview">
    <NmorphButton height="thick">Thick</NmorphButton>
    <NmorphButton height="basic">Basic</NmorphButton>
    <NmorphButton height="thin">Thin</NmorphButton>
  </div>
</template>

<style lang="scss">
.button-height-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
