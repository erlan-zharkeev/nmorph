<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-offset-overview">
    <ClientOnly>
      <div class="badge-value-overview__element">
        <NmorphBadge :value="1" :offsetX="10" :offsetY="10">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
      <div class="badge-value-overview__element">
        <NmorphBadge value="abc" :offsetX="-70" :offsetY="-35">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-offset-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
