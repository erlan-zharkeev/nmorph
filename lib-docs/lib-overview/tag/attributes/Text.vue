<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import TextExample from "./Text.example.vue";
import textSource from "./Text.example.vue?raw";
</script>

<template>
  <div id="content-text">
    <DocsExample
      header="Text"
      :subtitle="$t('overview.tag-item.text.subtitle')"
      :component="TextExample"
      :source="textSource"
    />
  </div>
</template>
