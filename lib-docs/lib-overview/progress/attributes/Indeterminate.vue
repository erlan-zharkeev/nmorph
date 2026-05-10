<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import IndeterminateExample from "./Indeterminate.example.vue";
import indeterminateSource from "./Indeterminate.example.vue?raw";
</script>

<template>
  <div id="content-indeterminate">
    <DocsExample
      header="Indeterminate"
      :subtitle="$t('overview.progress.indeterminate.subtitle')"
      :component="IndeterminateExample"
      :source="indeterminateSource"
    />
  </div>
</template>
