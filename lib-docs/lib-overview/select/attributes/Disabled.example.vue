<script setup lang="ts">
import { NmorphSelect } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="select-disabled-overview">
    <ClientOnly>
      <NmorphSelect disabled />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.select-disabled-overview {
}
</style>
