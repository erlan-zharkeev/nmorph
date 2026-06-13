<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

const color = ref("#4a90e2");
</script>

<template>
  <div class="color-picker-model-value-overview">
    <p class="nmorph-title-3">Value: {{ color }}</p>
    <NmorphColorPicker v-model="color" show-value />
  </div>
</template>

<style lang="scss">
.color-picker-model-value-overview {
  p {
    margin-bottom: 8px;
  }
}
</style>
