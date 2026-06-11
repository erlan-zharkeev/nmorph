<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="card-fill-overview">
    <NmorphCard :paper="3">
      <template #header>Fill</template>
      Takes the available width.
    </NmorphCard>
    <NmorphCard :fill="false" :paper="3">
      <template #header>Fit content</template>
      Width follows the content.
    </NmorphCard>
  </div>
</template>

<style lang="scss">
.card-fill-overview {
  display: grid;
  gap: 12px;
}
</style>
