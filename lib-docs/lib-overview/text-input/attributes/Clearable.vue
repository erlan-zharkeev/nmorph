<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ClearableExample from "./Clearable.example.vue";
import clearableSource from "./Clearable.example.vue?raw";
</script>

<template>
  <div id="content-clearable">
    <DocsExample
      header="Clearable"
      :subtitle="$t('overview.text-input.clearable.subtitle')"
      :component="ClearableExample"
      :source="clearableSource"
    />
  </div>
</template>
