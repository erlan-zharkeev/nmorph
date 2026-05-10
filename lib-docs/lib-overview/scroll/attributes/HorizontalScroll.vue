<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import HorizontalScrollExample from "./HorizontalScroll.example.vue";
import horizontalScrollSource from "./HorizontalScroll.example.vue?raw";
</script>

<template>
  <div id="content-horizontal-scroll">
    <DocsExample
      header="Horizontal scroll"
      :subtitle="$t('overview.scroll.horizontal-scroll.subtitle')"
      :component="HorizontalScrollExample"
      :source="horizontalScrollSource"
    />
  </div>
</template>
