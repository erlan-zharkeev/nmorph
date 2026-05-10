<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

const color = ref("#4a90e2");
</script>

<template>
  <div class="color-picker-display-format-overview">
    <ClientOnly>
      <NmorphColorPicker v-model="color" show-value display-format="hex" />
      <NmorphColorPicker v-model="color" show-value display-format="rgb" />
      <NmorphColorPicker v-model="color" show-value display-format="hsl" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-display-format-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
</style>
