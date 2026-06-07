<script setup lang="ts">
import GuideArticle from "~/components/guide/GuideArticle.vue";
import GuideMenu from "~/components/guide-menu/GuideMenu.vue";
import MainContentPart from "~/layouts/MainContentPart.vue";
import { guidePageMap, guidePages, type GuidePageSlug } from "~/data/guide";

const route = useRoute();
const slug = computed(() => String(route.params.slug || "") as GuidePageSlug);

definePageMeta({
  validate: (route) => guidePages.some((page) => page.slug === route.params.slug),
});
</script>

<template>
  <div class="docs-guide-page nmorph-docs-content">
    <MainContentPart>
      <template #aside>
        <GuideMenu :active-slug="slug" />
      </template>
      <template #default>
        <GuideArticle v-if="guidePageMap[slug]" :slug="slug" />
      </template>
    </MainContentPart>
  </div>
</template>

<style scoped lang="scss">
.docs-guide-page {
  width: 100%;
}
</style>
