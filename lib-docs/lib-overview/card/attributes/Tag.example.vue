<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="card-tag-overview">
    <NmorphCard tag="article">
      <template #header>Article</template>
      Semantic card root rendered as article.
    </NmorphCard>
    <NmorphCard tag="section">
      <template #header>Section</template>
      Semantic card root rendered as section.
    </NmorphCard>
  </div>
</template>

<style lang="scss">
.card-tag-overview {
  display: grid;
  gap: 12px;
}
</style>
