<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="otp-input-disabled-overview">
    <ClientOnly>
      <NmorphOTPInput disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-disabled-overview {
}
</style>
