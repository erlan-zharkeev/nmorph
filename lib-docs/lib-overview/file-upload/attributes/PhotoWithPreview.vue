<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PhotoWithPreviewExample from "./PhotoWithPreview.example.vue";
import photoWithPreviewSource from "./PhotoWithPreview.example.vue?raw";
</script>

<template>
  <div id="content-photo-with-preview">
    <DocsExample
      header="Photo-with-preview"
      :subtitle="$t('overview.file-upload.photo-with-preview.subtitle')"
      :component="PhotoWithPreviewExample"
      :source="photoWithPreviewSource"
    />
  </div>
</template>
