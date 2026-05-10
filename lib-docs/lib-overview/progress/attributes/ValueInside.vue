<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ValueInsideExample from "./ValueInside.example.vue";
import valueInsideSource from "./ValueInside.example.vue?raw";
</script>

<template>
  <div id="content-value-inside">
    <DocsExample
      header="Value Inside"
      :subtitle="$t('overview.progress.value-inside.subtitle')"
      :component="ValueInsideExample"
      :source="valueInsideSource"
    />
  </div>
</template>
