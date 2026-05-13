<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import BasicUsageExample from "./BasicUsage.example.vue";
import basicUsageSource from "./BasicUsage.example.vue?raw";
</script>

<template>
  <div id="content-basic-usage">
    <DocsExample
      header="Basic Usage"
      :subtitle="$t('overview.empty.basic-usage.subtitle')"
      :component="BasicUsageExample"
      :source="basicUsageSource"
    />
  </div>
</template>
