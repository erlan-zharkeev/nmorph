<script setup lang="ts">
import { NmorphIcon, NmorphIconEye } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="icon-size-overview">
    <ClientOnly>
      <NmorphIcon size="large">
        <NmorphIconEye />
      </NmorphIcon>
      <NmorphIcon size="medium">
        <NmorphIconEye />
      </NmorphIcon>
      <NmorphIcon size="small">
        <NmorphIconEye />
      </NmorphIcon>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.icon-size-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
