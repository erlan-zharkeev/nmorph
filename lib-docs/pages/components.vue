<script setup lang="ts">
import ComponentsList from "~/components/component-list/ComponentList.vue";
import MainContentPart from "~/layouts/MainContentPart.vue";
import Overview from "~/components/overview/Overview.vue";
</script>

<template>
  <div class="docs-components-page nmorph-docs-content">
    <MainContentPart>
      <template #aside>
        <ComponentsList />
      </template>
      <template #default>
        <section ref="componentPage">
          <Overview />
        </section>
      </template>
    </MainContentPart>
  </div>
</template>

<style lang="scss">
.docs-components-page__nav {
  li {
    text-align: center;
    margin-bottom: 8px;
  }
}

.docs-components-page__title {
  text-align: center;
}

.docs-components-page--active {
  font-weight: 800;
}
</style>
