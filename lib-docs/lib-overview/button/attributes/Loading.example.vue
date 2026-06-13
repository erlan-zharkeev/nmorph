<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-loading-overview">
    <NmorphButton design="nmorph" loading />
    <NmorphButton design="plain" loading />
  </div>
</template>

<style lang="scss">
.button-loading-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
