<script setup lang="ts">
import {
  NmorphDivider,
  NmorphScroll,
} from "@nmorph/nmorph-ui-kit";
import { FirstScreen, QuickStart, Config } from '~/components/guide-page-sections'
</script>

<template>
  <div class="docs-guide-page nmorph--shadow-outset">
    <NmorphScroll class="page">
      <FirstScreen />
      <NmorphDivider />
      <QuickStart />
      <Config />
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-guide-page {
  width: calc(100% - 16px);
  margin: 8px;
  border-radius: 4px;

  .page {
    height: calc(var(--container-height) - 16px) !important;
  }
}

.info-section {
  padding: 16px;
}

.docs-info {
  margin-top: 8px;
  max-width: 900px;
}

.section-title {
  margin-top: 16px;
  margin-bottom: 16px;
}

.section-element {
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
}
</style>
