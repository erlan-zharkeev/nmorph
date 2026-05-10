<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="select-loading-overview">
    <ClientOnly>
      <NmorphSelect loading />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-loading-overview {
}
</style>
