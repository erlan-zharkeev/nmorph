<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import SizeExample from "./Size.example.vue";
import sizeSource from "./Size.example.vue?raw";
</script>

<template>
  <div id="content-size">
    <DocsExample
      header="Size"
      :subtitle="$t('overview.icon.size.subtitle')"
      :component="SizeExample"
      :source="sizeSource"
    />
  </div>
</template>
