<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-type-overview">
    <NmorphButton style-type="default">Default</NmorphButton>
    <NmorphButton style-type="transparent">Transparent</NmorphButton>
    <NmorphButton style-type="transparent" color="var(--nmorph-accent-color)"
      >Edit</NmorphButton
    >
  </div>
</template>

<style lang="scss">
.button-type-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
