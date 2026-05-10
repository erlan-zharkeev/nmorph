<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import StyleTypeExample from "./StyleType.example.vue";
import styleTypeSource from "./StyleType.example.vue?raw";
</script>

<template>
  <div id="content-style-type">
    <DocsExample
      header="Style type"
      :subtitle="$t('overview.button.style-type.subtitle')"
      :component="StyleTypeExample"
      :source="styleTypeSource"
    />
  </div>
</template>
