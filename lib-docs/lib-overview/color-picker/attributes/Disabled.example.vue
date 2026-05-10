<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="color-picker-disabled-overview">
    <ClientOnly>
      <NmorphColorPicker model-value="#6b7280" show-value disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-disabled-overview {
}
</style>
