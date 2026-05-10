<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="color-picker-height-overview">
    <ClientOnly>
      <NmorphColorPicker height="thick" />
      <NmorphColorPicker height="basic" />
      <NmorphColorPicker height="thin" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-height-overview {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
