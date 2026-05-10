<script setup lang="ts">
import { NmorphColorPicker } from "@nmorph/nmorph-ui-kit";

const color = ref("#4a90e2");
</script>

<template>
  <div class="color-picker-model-value-overview">
    <ClientOnly>
      <p class="nmorph-title-3">{{ $t("overview.value") }} {{ color }}</p>
      <NmorphColorPicker v-model="color" show-value />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.color-picker-model-value-overview {
  p {
    margin-bottom: 8px;
  }
}
</style>
