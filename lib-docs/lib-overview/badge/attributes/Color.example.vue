<script setup lang="ts">
import { NmorphBadge, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="badge-color-overview">
    <ClientOnly>
      <div class="badge-value-overview__element">
        <NmorphBadge is-dot color="red">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
      <div class="badge-value-overview__element">
        <NmorphBadge color="green" value="abc">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
      <div class="badge-value-overview__element">
        <NmorphBadge color="var(--nmorph-warn-color)" :value="1">
          <NmorphButton text="button" />
        </NmorphBadge>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.badge-color-overview {
  display: flex;

  .badge-value-overview__element {
    margin-right: 30px;
  }
}
</style>
