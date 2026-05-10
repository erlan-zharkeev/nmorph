<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import DirectionExample from "./Direction.example.vue";
import directionSource from "./Direction.example.vue?raw";
</script>

<template>
  <div id="content-direction">
    <DocsExample
      header="Direction"
      :subtitle="$t('overview.divider.direction.subtitle')"
      :component="DirectionExample"
      :source="directionSource"
    />
  </div>
</template>
