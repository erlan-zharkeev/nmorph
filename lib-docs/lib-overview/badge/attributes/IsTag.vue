<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import IsTagExample from "./IsTag.example.vue";
import isTagSource from "./IsTag.example.vue?raw";
</script>

<template>
  <div id="content-is-tag">
    <DocsExample
      header="Is Tag"
      :subtitle="$t('overview.badge.is-tag.subtitle')"
      :component="IsTagExample"
      :source="isTagSource"
    />
  </div>
</template>
