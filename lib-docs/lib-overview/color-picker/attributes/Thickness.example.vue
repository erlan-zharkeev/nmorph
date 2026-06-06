<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="color-picker-thickness-overview">
    <ClientOnly>
      <NmorphColorPicker thickness="thick" />
      <NmorphColorPicker thickness="basic" />
      <NmorphColorPicker thickness="thin" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-thickness-overview {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
