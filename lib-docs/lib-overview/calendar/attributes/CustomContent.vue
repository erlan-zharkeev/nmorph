<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import CustomContentExample from "./CustomContent.example.vue";
import customContentSource from "./CustomContent.example.vue?raw";
</script>

<template>
  <div id="content-custom-content">
    <DocsExample
      header="Custom content"
      :component="CustomContentExample"
      :source="customContentSource"
    />
  </div>
</template>
