<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import LoadingTextExample from "./LoadingText.example.vue";
import loadingTextSource from "./LoadingText.example.vue?raw";
</script>

<template>
  <div id="content-loading-text">
    <DocsExample
      header="Loading Icon"
      :subtitle="$t('overview.image.loading-text.subtitle')"
      :component="LoadingTextExample"
      :source="loadingTextSource"
    />
  </div>
</template>
