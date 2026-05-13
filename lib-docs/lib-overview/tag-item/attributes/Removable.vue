<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import RemovableExample from "./Removable.example.vue";
import removableSource from "./Removable.example.vue?raw";
</script>

<template>
  <div id="content-removable">
    <DocsExample
      header="Removable"
      :subtitle="$t('overview.tag-item.removable.subtitle')"
      info-name="tag-item.removable"
      :component="RemovableExample"
      :source="removableSource"
    />
  </div>
</template>
