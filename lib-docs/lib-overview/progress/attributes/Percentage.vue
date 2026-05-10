<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PercentageExample from "./Percentage.example.vue";
import percentageSource from "./Percentage.example.vue?raw";
</script>

<template>
  <div id="content-percentage">
    <DocsExample
      header="Percentage"
      :subtitle="$t('overview.progress.percentage.subtitle')"
      info-name="progress.percentage"
      :component="PercentageExample"
      :source="percentageSource"
    />
  </div>
</template>
