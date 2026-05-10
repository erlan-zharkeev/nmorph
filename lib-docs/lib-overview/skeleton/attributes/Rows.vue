<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import RowsExample from "./Rows.example.vue";
import rowsSource from "./Rows.example.vue?raw";
</script>

<template>
  <div id="content-rows">
    <DocsExample
      header="Rows"
      :subtitle="$t('overview.skeleton.rows.subtitle')"
      :component="RowsExample"
      :source="rowsSource"
    />
  </div>
</template>
