<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import LoadFailedTextExample from "./LoadFailedText.example.vue";
import loadFailedTextSource from "./LoadFailedText.example.vue?raw";
</script>

<template>
  <div id="content-load-failed-text">
    <DocsExample
      header="Load Failed Text"
      :subtitle="$t('overview.image.load-failed-text.subtitle')"
      :component="LoadFailedTextExample"
      :source="loadFailedTextSource"
    />
  </div>
</template>
