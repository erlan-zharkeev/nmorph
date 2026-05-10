<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import BasicUsageExample from "./BasicUsage.example.vue";
import basicUsageSource from "./BasicUsage.example.vue?raw";
</script>

<template>
  <div id="content-basic-usage">
    <DocsExample
      :header="$t('overview.basic-usage')"
      :subtitle="$t('overview.table.basic-usage.subtitle')"
      info-name="table.basic-usage"
      info-type="warning"
      :component="BasicUsageExample"
      :source="basicUsageSource"
    />
  </div>
</template>
