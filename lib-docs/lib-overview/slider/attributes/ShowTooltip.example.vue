<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="slider-show-tooltip-overview">
    <NmorphSlider :show-tooltip="false" :model-value="50" />
  </div>
</template>

<style lang="scss">
.slider-show-tooltip-overview {
  width: 300px;
  min-height: 40px;
}
</style>
