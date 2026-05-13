<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import TagExample from "./Tag.example.vue";
import tagSource from "./Tag.example.vue?raw";
</script>

<template>
  <div id="content-card-tag">
    <DocsExample
      header="Tag"
      :subtitle="$t('overview.card.tag.subtitle')"
      :component="TagExample"
      :source="tagSource"
    />
  </div>
</template>
