<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import IconNameExample from "./IconName.example.vue";
import iconNameSource from "./IconName.example.vue?raw";
</script>

<template>
  <div id="content-icon-name">
    <DocsExample
      header="Icon name"
      :subtitle="$t('overview.link.icon-name.subtitle')"
      :component="IconNameExample"
      :source="iconNameSource"
    />
  </div>
</template>
