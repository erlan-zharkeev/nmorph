<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import MaxHeightExample from "./MaxHeight.example.vue";
import maxHeightSource from "./MaxHeight.example.vue?raw";
</script>

<template>
  <div id="content-max-height">
    <DocsExample
      header="Max height"
      :subtitle="$t('overview.scroll.max-height.subtitle')"
      :component="MaxHeightExample"
      :source="maxHeightSource"
    />
  </div>
</template>
