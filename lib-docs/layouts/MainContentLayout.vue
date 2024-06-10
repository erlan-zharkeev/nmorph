<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";

interface IProps {}
const props = withDefaults(defineProps<IProps>(), {});
</script>

<template>
  <div class="docs-layout-content">
    <aside class="docs-layout-content__card nmorph-outset">aside left</aside>
    <NmorphScroll
      class="docs-layout__scroll-container nmorph-outset docs-layout-content__card"
    >
      <main class="docs-layout-content__main">
        <section>
          <p v-for="_ in 40" :key="_">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            beatae perferendis odio earum, facilis adipisci laboriosam eum
            molestias deserunt architecto harum amet quae ea maiores. Eaque
            accusantium labore aliquam commodi.
          </p>
        </section>
        <footer class="docs-layout-content__card docs-layout-content__bottom">
          footer
        </footer>
      </main>
      <aside
        class="docs-layout-content__card nmorph-inset docs-layout-content__main-aside"
      >
        Aside right
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
  height: calc(100vh - 50px);
}

.docs-layout-content__card {
  border-radius: 4px;
  padding: 8px;
}
.docs-layout__scroll-container {
  display: flex;
  justify-content: space-between;
  padding-right: 6px;
}
.docs-layout-content__main-aside {
  position: sticky;
  top: 0;
  width: 200px;
}
</style>
