<script setup lang="ts">
const { t } = useI18n();

const list: { name: string; hash: string }[] = [
  { name: t("guide-menu.quick-start"), hash: "quick-start" },
];
</script>

<template>
  <div class="docs-guide-menu">
    <div
      class="docs-guide-menu__element"
      v-for="element in list"
      :key="element.name"
    >
      <NuxtLink
        :to="{ path: '/guide', hash: element.hash }"
        class="docs-guide-menu__element-title nmorph-title-1"
      >
        {{ element.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss"></style>
