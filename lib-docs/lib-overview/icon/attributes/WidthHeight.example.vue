<script setup lang="ts">
import { NmorphIcon, NmorphIconLoader } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="icon-width-height-overview">
    <ClientOnly>
      <NmorphIcon width="33px" height="33px">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon width="23px" height="23px">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon width="12px" height="12px">
        <NmorphIconLoader />
      </NmorphIcon>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.icon-width-height-overview {
  display: flex;
  align-items: center;

  .nmorph-icon {
    margin: 0 8px;
  }
}
</style>
