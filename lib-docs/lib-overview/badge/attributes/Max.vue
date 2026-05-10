<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import MaxExample from "./Max.example.vue";
import maxSource from "./Max.example.vue?raw";
</script>

<template>
  <div id="content-max">
    <DocsExample
      header="Max"
      :subtitle="$t('overview.badge.max.subtitle')"
      :component="MaxExample"
      :source="maxSource"
    />
  </div>
</template>
