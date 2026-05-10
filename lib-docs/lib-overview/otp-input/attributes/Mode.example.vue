<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="otp-input-mode-overview">
    <ClientOnly>
      <div class="otp-input-mode-overview__item">
        <p class="nmorph-title-3">numeric</p>
        <NmorphOTPInput mode="numeric" />
      </div>
      <div class="otp-input-mode-overview__item">
        <p class="nmorph-title-3">text</p>
        <NmorphOTPInput mode="text" />
      </div>
      <div class="otp-input-mode-overview__item">
        <p class="nmorph-title-3">alphanumeric</p>
        <NmorphOTPInput mode="alphanumeric" :length="4" />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-mode-overview {
  display: grid;
  gap: 12px;
}

.otp-input-mode-overview__item {
  display: grid;
  gap: 6px;

  p {
    margin: 0;
  }
}
</style>
