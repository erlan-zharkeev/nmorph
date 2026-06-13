<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";

const value = ref(3);
</script>

<template>
  <div class="number-input-basic-usage-overview">
    <NmorphNumberInput
      v-model="value"
      :max="5"
      :min="1"
      :step="1"
      thickness="thin"
    />
  </div>
</template>

<style lang="scss">
.number-input-basic-usage-overview {
  width: 150px;

  .nmorph-number-input {
    width: 100%;
  }
}
</style>
