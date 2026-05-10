<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-size-overview">
    <ClientOnly>
      <NmorphBadge is-tag value="tiny" size="tiny" />
      <NmorphBadge is-tag value="extra-small" size="extra-small" />
      <NmorphBadge is-tag value="base" size="base" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-size-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
</style>
