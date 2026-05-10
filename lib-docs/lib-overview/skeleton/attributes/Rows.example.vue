<script setup lang="ts">
import { NmorphSkeleton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="skeleton-rows-overview">
    <ClientOnly>
      <NmorphSkeleton :rows="3" :loading="true" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.skeleton-rows-overview {
  width: 100%;
  padding: 0 8px;
}
</style>
