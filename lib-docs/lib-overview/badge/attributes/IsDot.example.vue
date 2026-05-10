<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-is-dot-overview">
    <ClientOnly>
      <NmorphBadge is-dot>
        <NmorphButton text="button" />
      </NmorphBadge>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-is-dot-overview {
  .nmorph-badge {
    --dot-size: 8px;
  }
}
</style>
