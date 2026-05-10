<script setup lang="ts">
import { NmorphSwitch } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="switch-loading-overview">
    <ClientOnly>
      <NmorphSwitch loading disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.switch-loading-overview {
  .nmorph-switch {
    --height: 24px;
    --thumb-height: 18px;
  }
}
</style>
