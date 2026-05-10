<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="otp-input-length-overview">
    <ClientOnly>
      <NmorphOTPInput :length="4" />
      <NmorphOTPInput :length="6" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-length-overview {
  display: grid;
  gap: 8px;
}
</style>
