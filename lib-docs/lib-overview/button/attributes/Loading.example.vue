<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-loading-overview">
    <ClientOnly>
      <NmorphButton style-type="default" loading />
      <NmorphButton style-type="transparent" loading />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.button-loading-overview {
  .nmorph-button {
    margin: 0 8px;
  }
}
</style>
