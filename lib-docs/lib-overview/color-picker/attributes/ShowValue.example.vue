<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="color-picker-show-value-overview">
    <ClientOnly>
      <NmorphColorPicker show-value />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-show-value-overview {
}
</style>
