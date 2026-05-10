<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import FillExample from "./Fill.example.vue";
import fillSource from "./Fill.example.vue?raw";
</script>

<template>
  <div id="content-fill">
    <DocsExample
      header="Fill"
      :subtitle="$t('overview.select.fill.subtitle')"
      :component="FillExample"
      :source="fillSource"
    />
  </div>
</template>
