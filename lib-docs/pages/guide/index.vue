<script setup lang="ts">
import GuideLanding from "~/components/guide/GuideLanding.vue";
import GuideMenu from "~/components/guide-menu/GuideMenu.vue";
import MainContentPart from "~/layouts/MainContentPart.vue";
</script>

<template>
  <div class="docs-guide-page nmorph-docs-content">
    <MainContentPart>
      <template #aside>
        <GuideMenu />
      </template>
      <template #default>
        <GuideLanding />
      </template>
    </MainContentPart>
  </div>
</template>

<style scoped lang="scss">
.docs-guide-page {
  width: 100%;
}
</style>
