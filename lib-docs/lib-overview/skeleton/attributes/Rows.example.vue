<script setup lang="ts">
import { NmorphSkeleton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="skeleton-rows-overview">
    <NmorphSkeleton :rows="3" :loading="true" />
  </div>
</template>

<style lang="scss">
.skeleton-rows-overview {
  width: 100%;
  padding: 0 8px;
}
</style>
