<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ModelValueExample from "./ModelValue.example.vue";
import modelValueSource from "./ModelValue.example.vue?raw";
</script>

<template>
  <div id="content-value">
    <DocsExample
      header="Model value"
      :subtitle="$t('overview.scroll.model-value.subtitle')"
      :component="ModelValueExample"
      :source="modelValueSource"
    />
  </div>
</template>
