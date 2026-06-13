<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import LoadingSlotExample from "./LoadingSlot.example.vue";
import loadingSlotSource from "./LoadingSlot.example.vue?raw";
</script>

<template>
  <div id="content-loading-slot">
    <DocsExample
      header="Loading Slot"
      :subtitle="$t('overview.image.loading-slot.subtitle')"
      :component="LoadingSlotExample"
      :source="loadingSlotSource"
    />
  </div>
</template>
