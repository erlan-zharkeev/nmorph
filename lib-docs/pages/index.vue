<script setup lang="ts">
import { FirstScreen } from '~/components/guide-page-sections'
</script>

<template>
  <div class="docs-first-page nmorph-docs-content">
    <main class="docs-first-page__surface nmorph--shadow-outset">
      <FirstScreen />
    </main>
  </div>
</template>

<style lang="scss">
.docs-first-page {
  box-sizing: border-box;
  padding: var(--docs-layout-shadow-space);
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
