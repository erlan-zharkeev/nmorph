<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PaperExample from "./Paper.example.vue";
import paperSource from "./Paper.example.vue?raw";
</script>

<template>
  <div id="content-card-paper">
    <DocsExample
      header="Paper"
      :subtitle="$t('overview.card.paper.subtitle')"
      :component="PaperExample"
      :source="paperSource"
    />
  </div>
</template>
