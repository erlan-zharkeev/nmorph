<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import PaddingExample from "./Padding.example.vue";
import paddingSource from "./Padding.example.vue?raw";
</script>

<template>
  <div id="content-card-padding">
    <DocsExample
      header="Card Padding"
      :subtitle="$t('overview.card.card-padding.subtitle')"
      :component="PaddingExample"
      :source="paddingSource"
    />
  </div>
</template>
