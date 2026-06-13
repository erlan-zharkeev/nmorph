<script setup lang="ts">
import { NmorphSlider } from "@nmorph/nmorph-ui-kit";

const value = ref(3);
</script>

<template>
  <div class="slider-basic-usage-overview">
    <NmorphSlider :min="1" :max="22" :step="1" v-model="value" />
  </div>
</template>

<style lang="scss">
.slider-basic-usage-overview {
  width: 300px;
  min-height: 40px;
}
</style>
