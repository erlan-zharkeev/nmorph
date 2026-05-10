<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ShapeExample from "./Shape.example.vue";
import shapeSource from "./Shape.example.vue?raw";
</script>

<template>
  <div id="content-shape">
    <DocsExample
      info-name="button.shape"
      header="Shape"
      :subtitle="$t('overview.button.shape.subtitle')"
      :component="ShapeExample"
      :source="shapeSource"
    />
  </div>
</template>
