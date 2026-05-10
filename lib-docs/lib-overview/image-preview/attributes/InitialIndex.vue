<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import InitialIndexExample from "./InitialIndex.example.vue";
import initialIndexSource from "./InitialIndex.example.vue?raw";
</script>

<template>
  <div id="content-initial-index">
    <DocsExample
      header="Initial Index"
      :subtitle="$t('overview.image-preview.initial-index.subtitle')"
      :component="InitialIndexExample"
      :source="initialIndexSource"
    />
  </div>
</template>
