<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();

interface IProps {
  activeAnchor?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  activeAnchor: ''
})

const list: { name: string; hash: string }[] = [
  { name: t("guide-menu.quick-start"), hash: "#quick-start" },
  { name: t("guide-menu.config"), hash: "#config" },
  { name: t("guide-menu.other"), hash: "#other" },
];
</script>

<template>
  <div class="docs-guide-menu">
    <div class="docs-guide-menu__element" v-for="element in list" :key="element.name">
      <NuxtLink :to="localePath({ path: '/guide', hash: element.hash })" class="docs-guide-menu__element-title"
        :class="{ 'docs-guide-menu__element-title--active': props.activeAnchor === element.hash }">
        {{ element.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.docs-guide-menu {

  a {
    font-size: 20px;
    font-weight: 400;
  }

  .docs-guide-menu__element {
    margin-top: 12px;
  }

  .docs-guide-menu__element-title--active {
    font-weight: 800;
  }
}

@include max-width-query(768) {
  .docs-guide-menu {
    a {
      font-size: 18px;
      line-height: 1.3;
    }
  }
}
</style>
