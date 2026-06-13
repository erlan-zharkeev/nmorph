<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-max-overview">
    <NmorphBadge :max="18" :value="100">
      <NmorphButton text="button" />
    </NmorphBadge>
  </div>
</template>

<style lang="scss">
.badge-max-overview {
}
</style>
