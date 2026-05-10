<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import WidthHeightExample from "./WidthHeight.example.vue";
import widthHeightSource from "./WidthHeight.example.vue?raw";
</script>

<template>
  <div id="content-width-height">
    <DocsExample
      header="Width/Height"
      :subtitle="$t('overview.icon.width-height.subtitle')"
      :component="WidthHeightExample"
      :source="widthHeightSource"
    />
  </div>
</template>
