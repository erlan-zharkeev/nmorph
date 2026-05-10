<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="slider-show-tooltip-overview">
    <ClientOnly>
      <NmorphSlider :show-tooltip="false" :model-value="50" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.slider-show-tooltip-overview {
  width: 300px;
  min-height: 40px;
}
</style>
