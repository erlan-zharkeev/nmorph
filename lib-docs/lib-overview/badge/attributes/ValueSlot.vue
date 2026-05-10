<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ValueSlotExample from "./ValueSlot.example.vue";
import valueSlotSource from "./ValueSlot.example.vue?raw";
</script>

<template>
  <div id="content-value-slot">
    <DocsExample
      header="Value Slot"
      :subtitle="$t('overview.badge.value-slot.subtitle')"
      :component="ValueSlotExample"
      :source="valueSlotSource"
    />
  </div>
</template>
