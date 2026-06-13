<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-value-overview">
    <div class="badge-value-overview__element">
      <NmorphBadge value="abc">
        <NmorphButton text="button" />
      </NmorphBadge>
    </div>
    <div class="badge-value-overview__element">
      <NmorphBadge :value="99">
        <NmorphButton text="button" />
      </NmorphBadge>
    </div>
  </div>
</template>

<style lang="scss">
.badge-value-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 24px;
  }
}
</style>
