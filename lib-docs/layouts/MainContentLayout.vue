<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="docs-layout-content">
    <aside
      class="docs-layout-content__card nmorph-outset docs-layout-content__left-aside"
    >
      <slot name="aside" />
    </aside>
    <NmorphScroll
      class="docs-layout__scroll-container nmorph-outset docs-layout-content__card"
    >
      <main class="docs-layout-content__main">
        <slot name="default" />
        <footer class="docs-layout-content__card docs-layout-content__bottom">
          footer
        </footer>
      </main>
      <aside
        class="docs-layout-content__card nmorph-inset docs-layout-content__main-aside"
      >
        <slot name="aside-right" />
      </aside>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-layout-content {
  padding: 10px 8px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 4fr;
}

.docs-layout-content__card {
  border-radius: 4px;
  padding: 8px;
}
.docs-layout__scroll-container {
  display: flex;
  justify-content: space-between;
  height: var(--container-height);
}

.docs-layout-content__main {
  width: 100%;
}

.docs-layout-content__main-aside {
  position: sticky;
  top: 0;
  width: 200px;
}

@include max-width-query(1024) {
  .docs-layout-content__main-aside {
    display: none;
  }
}

@include max-width-query(768) {
  .docs-layout-content__left-aside {
    display: none;
  }
  .docs-layout-content {
    grid-template-columns: 1fr;
  }
}
</style>
