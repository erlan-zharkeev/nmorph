<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import BasicUsageExample from "./BasicUsage.example.vue";
import basicUsageSource from "./BasicUsage.example.vue?raw";
</script>

<template>
  <div id="content-model-value">
    <DocsExample
      :header="$t('overview.basic-usage')"
      :component="BasicUsageExample"
      :source="basicUsageSource"
    />
  </div>
</template>
