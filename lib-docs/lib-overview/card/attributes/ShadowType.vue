<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ShadowTypeExample from "./ShadowType.example.vue";
import shadowTypeSource from "./ShadowType.example.vue?raw";
</script>

<template>
  <div id="content-shadow-type">
    <DocsExample
      header="Shadow Type"
      :subtitle="$t('overview.card.shadow-type.subtitle')"
      :component="ShadowTypeExample"
      :source="shadowTypeSource"
    />
  </div>
</template>
