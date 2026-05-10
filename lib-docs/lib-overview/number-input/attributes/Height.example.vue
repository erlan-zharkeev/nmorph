<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="number-input-height-overview">
    <ClientOnly>
      <NmorphNumberInput height="thick" />
      <NmorphNumberInput height="basic" />
      <NmorphNumberInput height="thin" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.number-input-height-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-number-input {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}
</style>
