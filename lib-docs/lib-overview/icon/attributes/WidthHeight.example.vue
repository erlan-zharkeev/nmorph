<script setup lang="ts">
import { NmorphIcon, NmorphIconLoaderDots } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="icon-width-height-overview">
    <NmorphIcon width="33px" height="33px">
      <NmorphIconLoaderDots />
    </NmorphIcon>
    <NmorphIcon width="23px" height="23px">
      <NmorphIconLoaderDots />
    </NmorphIcon>
    <NmorphIcon width="12px" height="12px">
      <NmorphIconLoaderDots />
    </NmorphIcon>
  </div>
</template>

<style lang="scss">
.icon-width-height-overview {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
