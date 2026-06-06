<script setup lang="ts">
import { NmorphRadio } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="radio-value-overview">
    <NmorphRadio checked value="1" label="One" />
    <NmorphRadio value="2" checked design="plain" label="Two" />
  </div>
</template>

<style lang="scss">
.radio-value-overview {
  display: flex;
  align-items: center;

  .nmorph-radio {
    margin-right: 8px;
  }
}
</style>
