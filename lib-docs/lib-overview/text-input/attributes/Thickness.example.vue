<script setup lang="ts">
import { NmorphTextInput } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="text-input-thickness-overview">
    <NmorphTextInput thickness="thick" placeholder="Enter text" />
    <NmorphTextInput thickness="basic" placeholder="Enter text" />
    <NmorphTextInput thickness="thin" placeholder="Enter text" />
  </div>
</template>

<style lang="scss">
.text-input-thickness-overview {
  display: flex;
  align-items: center;

  .nmorph-text-input {
    margin-right: 8px;
  }
}
</style>
