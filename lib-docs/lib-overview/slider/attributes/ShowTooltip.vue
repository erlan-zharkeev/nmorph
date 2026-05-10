<script setup lang="ts">
import DocsExample from "~/components/docs-example/DocsExample.vue";
import ShowTooltipExample from "./ShowTooltip.example.vue";
import showTooltipSource from "./ShowTooltip.example.vue?raw";
</script>

<template>
  <div id="content-show-tooltip">
    <DocsExample
      header="Show-tooltip"
      :subtitle="$t('overview.slider.show-tooltip.subtitle')"
      :component="ShowTooltipExample"
      :source="showTooltipSource"
    />
  </div>
</template>
