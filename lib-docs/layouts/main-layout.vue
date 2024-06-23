<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="docs-main-layout">
    <aside
      class="docs-main-layout__card nmorph-outset docs-main-layout__left-aside"
    >
      <slot name="aside" />
    </aside>
    <NmorphScroll
      class="docs-main-layout__scroll-container nmorph-outset docs-main-layout__card"
    >
      <main class="docs-main-layout__center">
        <slot name="default" />
      </main>
      <aside
        class="docs-main-layout__card nmorph-inset docs-main-layout__center-aside"
      >
        <slot name="aside-right" />
      </aside>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-main-layout {
  padding: 10px 8px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 4fr;
}

.docs-main-layout__card {
  border-radius: 4px;
  padding: 8px;
}
.docs-main-layout__scroll-container {
  display: flex;
  justify-content: space-between;
  height: var(--container-height);
}

.docs-main-layout__center {
  width: 100%;
}

.docs-main-layout__center-aside {
  position: sticky;
  top: 0;
  width: 200px;
}

@include max-width-query(1024) {
  .docs-main-layout__center-aside {
    display: none;
  }
}

@include max-width-query(768) {
  .docs-main-layout__left-aside {
    display: none;
  }
  .docs-main-layout {
    grid-template-columns: 1fr;
  }
}
</style>
