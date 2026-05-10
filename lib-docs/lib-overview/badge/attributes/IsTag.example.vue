<script setup lang="ts">
import { NmorphBadge } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-is-tag-overview">
    <ClientOnly>
      <NmorphBadge is-tag value="beta" />
      <NmorphBadge is-tag color="var(--nmorph-success-color)" value="stable" />
      <NmorphBadge is-tag color="var(--nmorph-warn-color)" value="deprecated" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-is-tag-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
