<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PreviewExample from "./Preview.example.vue";
import previewSource from "./Preview.example.vue?raw";
</script>

<template>
  <div id="content-preview">
    <DocsExample
      header="Preview"
      :subtitle="$t('overview.avatar.preview.subtitle')"
      :component="PreviewExample"
      :source="previewSource"
    />
  </div>
</template>
