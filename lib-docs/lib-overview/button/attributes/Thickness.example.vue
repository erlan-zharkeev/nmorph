<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-thickness-overview">
    <NmorphButton thickness="thick">Thick</NmorphButton>
    <NmorphButton thickness="basic">Basic</NmorphButton>
    <NmorphButton thickness="thin">Thin</NmorphButton>
  </div>
</template>

<style lang="scss">
.button-thickness-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
</style>
