<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="otp-input-thickness-overview">
    <ClientOnly>
      <NmorphOTPInput thickness="thick" />
      <NmorphOTPInput thickness="basic" />
      <NmorphOTPInput thickness="thin" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-thickness-overview {
  display: grid;
  gap: 8px;
}
</style>
