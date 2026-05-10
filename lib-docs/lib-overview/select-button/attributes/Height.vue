<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import HeightExample from "./Height.example.vue";
import heightSource from "./Height.example.vue?raw";
</script>

<template>
  <div id="content-height">
    <DocsExample
      header="Height"
      :subtitle="$t('overview.select-button.height.subtitle')"
      :component="HeightExample"
      :source="heightSource"
    />
  </div>
</template>
