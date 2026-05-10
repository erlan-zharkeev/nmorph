<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="otp-input-height-overview">
    <ClientOnly>
      <NmorphOTPInput height="thick" />
      <NmorphOTPInput height="basic" />
      <NmorphOTPInput height="thin" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-height-overview {
  display: grid;
  gap: 8px;
}
</style>
