<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import FrameBorderExample from "./FrameBorder.example.vue";
import frameBorderSource from "./FrameBorder.example.vue?raw";
</script>

<template>
  <div id="content-frame-border">
    <DocsExample
      header="Frame Border"
      :subtitle="$t('overview.image.api.frame-border')"
      :component="FrameBorderExample"
      :source="frameBorderSource"
    />
  </div>
</template>
