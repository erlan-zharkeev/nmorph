<script setup lang="ts">
import { NmorphNumberInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="number-input-disabled-overview">
    <ClientOnly>
      <NmorphNumberInput disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.number-input-disabled-overview {
}
</style>
