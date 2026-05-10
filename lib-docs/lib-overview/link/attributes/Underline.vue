<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import UnderlineExample from "./Underline.example.vue";
import underlineSource from "./Underline.example.vue?raw";
</script>

<template>
  <div id="content-underline">
    <DocsExample
      header="Underline"
      :subtitle="$t('overview.link.underline.subtitle')"
      :component="UnderlineExample"
      :source="underlineSource"
    />
  </div>
</template>
