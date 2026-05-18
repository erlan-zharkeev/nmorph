<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import TypeExample from "./Type.example.vue";
import typeSource from "./Type.example.vue?raw";
</script>

<template>
  <div id="content-type">
    <DocsExample
      header="Type"
      :subtitle="$t('overview.badge.type.subtitle')"
      :component="TypeExample"
      :source="typeSource"
    />
  </div>
</template>
