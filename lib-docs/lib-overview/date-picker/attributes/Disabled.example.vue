<script setup lang="ts">
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="date-picker-disabled-overview">
    <ClientOnly>
      <NmorphDatePicker :model-value="new Date()" disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.date-picker-disabled-overview {
}
</style>
