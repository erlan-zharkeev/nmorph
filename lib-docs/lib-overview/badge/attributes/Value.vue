<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ValueExample from "./Value.example.vue";
import valueSource from "./Value.example.vue?raw";
</script>

<template>
  <div id="content-value">
    <DocsExample
      header="Value"
      :subtitle="$t('overview.badge.value.subtitle')"
      :component="ValueExample"
      :source="valueSource"
    />
  </div>
</template>
