<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import FitExample from "./Fit.example.vue";
import fitSource from "./Fit.example.vue?raw";
</script>

<template>
  <div id="content-fit">
    <DocsExample
      header="Fit"
      :subtitle="$t('overview.avatar.fit.subtitle')"
      :component="FitExample"
      :source="fitSource"
    />
  </div>
</template>
