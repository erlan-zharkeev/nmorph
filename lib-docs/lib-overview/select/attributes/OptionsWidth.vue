<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import OptionsWidthExample from "./OptionsWidth.example.vue";
import optionsWidthSource from "./OptionsWidth.example.vue?raw";
</script>

<template>
  <div id="content-options-width">
    <DocsExample
      header="Options width"
      :subtitle="$t('overview.select.options-width.subtitle')"
      :component="OptionsWidthExample"
      :source="optionsWidthSource"
    />
  </div>
</template>
