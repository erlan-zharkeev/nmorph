<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="card-padding-overview">
    <NmorphCard card-padding="8px">Compact padding</NmorphCard>
    <NmorphCard :card-padding="24">Numeric padding</NmorphCard>
    <NmorphCard card-padding="var(--indentation-06)">Token padding</NmorphCard>
  </div>
</template>

<style lang="scss">
.card-padding-overview {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
</style>
