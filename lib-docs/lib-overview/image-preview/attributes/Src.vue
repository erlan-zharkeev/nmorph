<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import SrcExample from "./Src.example.vue";
import srcSource from "./Src.example.vue?raw";
</script>

<template>
  <div id="content-src">
    <DocsExample
      header="Src"
      :subtitle="$t('overview.image-preview.src.subtitle')"
      :component="SrcExample"
      :source="srcSource"
    />
  </div>
</template>
