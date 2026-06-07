<script setup lang="ts">
import { NmorphIcon, NmorphIconEye } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="icon-size-overview">
    <NmorphIcon size="large">
      <NmorphIconEye />
    </NmorphIcon>
    <NmorphIcon size="medium">
      <NmorphIconEye />
    </NmorphIcon>
    <NmorphIcon size="small">
      <NmorphIconEye />
    </NmorphIcon>
  </div>
</template>

<style lang="scss">
.icon-size-overview {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
