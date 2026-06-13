<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const value = ref(2);
</script>

<template>
  <div class="number-input-action-btn-position-right-overview">
    <NmorphNumberInput
      action-btn-position-right
      v-model="value"
      thickness="thick"
    />
  </div>
</template>

<style lang="scss">
.number-input-action-btn-position-right-overview {
}
</style>
