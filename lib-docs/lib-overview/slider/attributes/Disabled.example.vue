<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="slider-disabled-overview">
    <ClientOnly>
      <NmorphSlider disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.slider-disabled-overview {
  width: 300px;
}
</style>
