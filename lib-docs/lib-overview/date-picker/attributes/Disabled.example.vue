<script setup lang="ts">
import { NmorphDatePicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="date-picker-disabled-overview">
    <NmorphDatePicker :model-value="new Date()" disabled />
  </div>
</template>

<style lang="scss">
.date-picker-disabled-overview {
}
</style>
