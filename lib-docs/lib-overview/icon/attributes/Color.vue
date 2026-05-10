<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ColorExample from "./Color.example.vue";
import colorSource from "./Color.example.vue?raw";
</script>

<template>
  <div id="content-color">
    <DocsExample
      header="Color"
      :subtitle="$t('overview.icon.color.subtitle')"
      :component="ColorExample"
      :source="colorSource"
    />
  </div>
</template>
