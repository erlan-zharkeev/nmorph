<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ShowValueExample from "./ShowValue.example.vue";
import showValueSource from "./ShowValue.example.vue?raw";
</script>

<template>
  <div id="content-show-value">
    <DocsExample
      header="Show-value"
      :subtitle="$t('overview.color-picker.show-value.subtitle')"
      :component="ShowValueExample"
      :source="showValueSource"
    />
  </div>
</template>
