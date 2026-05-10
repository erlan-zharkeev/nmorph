<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ForceCoordinateExample from "./ForceCoordinate.example.vue";
import forceCoordinateSource from "./ForceCoordinate.example.vue?raw";
</script>

<template>
  <div id="content-force-coordinate">
    <DocsExample
      header="Force coordinate"
      :subtitle="$t('overview.tooltip.force-coordinate.subtitle')"
      :component="ForceCoordinateExample"
      :source="forceCoordinateSource"
    />
  </div>
</template>
