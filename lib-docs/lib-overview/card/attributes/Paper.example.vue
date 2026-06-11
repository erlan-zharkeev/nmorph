<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="card-paper-overview">
    <NmorphCard :paper="0">
      <span>Paper 0</span>
    </NmorphCard>
    <NmorphCard :paper="2">
      <span>Paper 2</span>
    </NmorphCard>
    <NmorphCard :paper="5">
      <span>Paper 5</span>
    </NmorphCard>
  </div>
</template>

<style lang="scss">
.card-paper-overview {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  .nmorph-card {
    min-height: 84px;
    align-items: center;
    justify-content: center;
  }
}
</style>
