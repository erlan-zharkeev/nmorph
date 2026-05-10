<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import MultipleExample from "./Multiple.example.vue";
import multipleSource from "./Multiple.example.vue?raw";
</script>

<template>
  <div id="content-multiple">
    <DocsExample
      header="Multiple"
      :subtitle="$t('overview.file-upload.multiple.subtitle')"
      :component="MultipleExample"
      :source="multipleSource"
    />
  </div>
</template>
