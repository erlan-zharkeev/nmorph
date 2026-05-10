<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import OffsetExample from "./Offset.example.vue";
import offsetSource from "./Offset.example.vue?raw";
</script>

<template>
  <div id="content-offset">
    <DocsExample
      header="Offset"
      :subtitle="$t('overview.badge.offset.subtitle')"
      :component="OffsetExample"
      :source="offsetSource"
    />
  </div>
</template>
