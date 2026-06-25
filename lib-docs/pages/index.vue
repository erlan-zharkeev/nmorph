<script setup lang="ts">
import { NmorphCard } from "@nmorph/nmorph-ui-kit";
import { FirstScreen } from '~/components/guide-page-sections'
</script>

<template>
  <div class="docs-first-page nmorph-docs-content">
    <NmorphCard tag="main" class="docs-first-page__surface" padding="0" :paper="3">
      <FirstScreen />
    </NmorphCard>
  </div>
</template>

<style lang="scss">
.docs-first-page {
  box-sizing: border-box;
  padding: var(--docs-shell-surface-margin);
  overflow: hidden;
}

.docs-first-page__surface {
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  border-radius: 4px;
  background: var(--nmorph-main-color);
}
</style>
