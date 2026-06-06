<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ThicknessExample from "./Thickness.example.vue";
import thicknessSource from "./Thickness.example.vue?raw";
</script>

<template>
  <div id="content-thickness">
    <DocsExample
      header="Thickness"
      :subtitle="$t('overview.text-input.thickness.subtitle')"
      :component="ThicknessExample"
      :source="thicknessSource"
    />
  </div>
</template>
