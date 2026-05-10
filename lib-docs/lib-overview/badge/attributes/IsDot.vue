<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import IsDotExample from "./IsDot.example.vue";
import isDotSource from "./IsDot.example.vue?raw";
</script>

<template>
  <div id="content-is-dot">
    <DocsExample
      header="Is Dot"
      :subtitle="$t('overview.badge.is-dot.subtitle')"
      :component="IsDotExample"
      :source="isDotSource"
    />
  </div>
</template>
