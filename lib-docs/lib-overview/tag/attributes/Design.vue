<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import DesignExample from "./Design.example.vue";
import designSource from "./Design.example.vue?raw";
</script>

<template>
  <div id="content-design">
    <DocsExample
      header="Design"
      :subtitle="$t('overview.tag-item.design.subtitle')"
      :component="DesignExample"
      :source="designSource"
    />
  </div>
</template>
