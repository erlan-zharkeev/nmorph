<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="number-input-thickness-overview">
    <NmorphNumberInput thickness="thick" />
    <NmorphNumberInput thickness="basic" />
    <NmorphNumberInput thickness="thin" />
  </div>
</template>

<style lang="scss">
.number-input-thickness-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-number-input {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
