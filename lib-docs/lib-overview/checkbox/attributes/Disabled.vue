<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import DisabledExample from "./Disabled.example.vue";
import disabledSource from "./Disabled.example.vue?raw";
</script>

<template>
  <div id="content-disabled">
    <DocsExample
      header="Disabled"
      :subtitle="$t('overview.checkbox.disabled.subtitle')"
      :component="DisabledExample"
      :source="disabledSource"
    />
  </div>
</template>
