<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PositionExample from "./Position.example.vue";
import positionSource from "./Position.example.vue?raw";
</script>

<template>
  <div id="content-position">
    <DocsExample
      header="Position"
      :subtitle="$t('overview.tooltip.position.subtitle')"
      :component="PositionExample"
      :source="positionSource"
    />
  </div>
</template>
