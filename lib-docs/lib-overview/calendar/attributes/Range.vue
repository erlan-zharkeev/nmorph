<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import RangeExample from "./Range.example.vue";
import rangeSource from "./Range.example.vue?raw";
</script>

<template>
  <div id="content-range">
    <DocsExample
      header="Range"
      :subtitle="$t('overview.calendar.range.subtitle')"
      :component="RangeExample"
      :source="rangeSource"
    />
  </div>
</template>
