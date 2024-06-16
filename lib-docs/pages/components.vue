<script setup lang="ts">
import ComponentsList from "~/components/components-list/ComponentsList.vue";
import MainContentLayout from "~/layouts/MainContentLayout.vue";

const componentPage = ref<HTMLElement | null>(null);
const navigationContents = ref<string[]>([]);

const router = useRouter();

watch(
  () => router.currentRoute.value,
  () => {
    nextTick(() => {
      updateAnchor();
    });
  }
);

onMounted(() => {
  updateAnchor();
});

const updateAnchor = () => {
  if (!componentPage.value) return;
  const matchedEl = componentPage.value.querySelectorAll('[id^="content-"]');
  navigationContents.value = [];
  matchedEl.forEach((element) => {
    navigationContents.value.push(element.id);
  });
};
</script>

<template>
  <div class="docs-components-page page">
    <MainContentLayout>
      <template #aside><ComponentsList /></template>
      <template #default>
        <section ref="componentPage"><NuxtPage /></section>
      </template>
      <template #aside-right>
        <h3 class="nmorph-title-3 docs-components-page__title">
          {{ $t("componentsOverview.rightAsideTitle") }}
        </h3>
        <nav class="docs-components-page__nav">
          <ul>
            <li v-for="anchor in navigationContents" :key="anchor">
              <a :href="`#${anchor}`">{{
                capitalizeFirstLetter(anchor.substring(8))
              }}</a>
            </li>
          </ul>
        </nav>
      </template>
    </MainContentLayout>
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
</style>
