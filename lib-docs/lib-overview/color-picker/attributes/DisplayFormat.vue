<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import DisplayFormatExample from "./DisplayFormat.example.vue";
import displayFormatSource from "./DisplayFormat.example.vue?raw";
</script>

<template>
  <div id="content-display-format">
    <DocsExample
      header="Display-format"
      :subtitle="$t('overview.color-picker.display-format.subtitle')"
      :component="DisplayFormatExample"
      :source="displayFormatSource"
    />
  </div>
</template>
