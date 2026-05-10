<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import CircleSizeExample from "./CircleSize.example.vue";
import circleSizeSource from "./CircleSize.example.vue?raw";
</script>

<template>
  <div id="content-circle-size">
    <DocsExample
      header="Circle Size"
      :subtitle="$t('overview.progress.circle-size.subtitle')"
      :component="CircleSizeExample"
      :source="circleSizeSource"
    />
  </div>
</template>
