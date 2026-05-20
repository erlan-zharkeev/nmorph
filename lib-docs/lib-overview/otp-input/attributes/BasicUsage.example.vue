<script setup lang="ts">
import { NmorphOTPInput } from "@nmorph/nmorph-ui-kit";

const otpValue = ref("");
const completedValue = ref("");

const handleComplete = (value: string) => {
  completedValue.value = value;
};
</script>

<template>
  <div class="otp-input-basic-usage-overview">
    <ClientOnly>
      <p class="nmorph-title-3">Value: {{ otpValue || "-" }}</p>
      <p class="nmorph-title-3">Complete: {{ completedValue || "-" }}</p>
      <NmorphOTPInput v-model="otpValue" @complete="handleComplete" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.otp-input-basic-usage-overview {
  display: grid;
  gap: 8px;

  p {
    margin: 0;
  }
}
</style>
