<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-disabled-overview">
    <NmorphButton disabled>Disabled</NmorphButton>
    <NmorphButton disabled thickness="thin">Disabled</NmorphButton>
    <ClientOnly>
      <NmorphButton disabled loading />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.button-disabled-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
</style>
