<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="card-tag-overview">
    <NmorphCard tag="article" :paper="3">
      <template #header>Article</template>
      Semantic card root rendered as article.
    </NmorphCard>
    <NmorphCard tag="section" :paper="3">
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
