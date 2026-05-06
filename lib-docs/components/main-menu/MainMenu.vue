<script setup lang="ts">
import { NmorphOverlay, NmorphScroll } from "@nmorph/nmorph-ui-kit";
import ComponentsList from "~/components/component-list/ComponentList.vue";
import GuideMenu from "~/components/guide-menu/GuideMenu.vue";

interface IProps {
  isMenuOpen: boolean;
}
const props = withDefaults(defineProps<IProps>(), {});
interface INmorphEmit {
  (e: "menu-click"): void;
}
const emit = defineEmits<INmorphEmit>();
const route = useRoute();
const isComponentPage = computed(() => route.path.includes("components") || route.path.includes("elements"));
</script>

<template>
  <div class="docs-main-menu" :class="{ 'docs-main-menu--open': props.isMenuOpen }" @click="emit('menu-click')">
    <div class="nmorph-inset docs-main-menu__content">
      <NmorphScroll class="docs-main-menu__content__scroll">
        <ComponentsList v-if="isComponentPage" />
        <GuideMenu v-else />
      </NmorphScroll>
    </div>
    <NmorphOverlay :show="props.isMenuOpen" @on-outside-click="emit('menu-click')" />
  </div>
</template>

<style scoped lang="scss">
$transition: 0.2s ease-in-out left;

.nmorph-inset {
  display: inline-flex;
}

.docs-main-menu__content {
  width: fit-content;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  height: 100vh;
  background: var(--nmorph-main-color);
  padding: 16px;
}

.docs-main-menu {
  position: absolute;
  top: 50px;
  width: 100%;
  left: -100%;
  transition: 0.2s ease-in-out left;
  z-index: 2;
}

:deep(.docs-components-list__scroll) {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 16px;
}

.nmorph-overlay {
  top: 51px;
  width: 100%;
  opacity: 0;
  transition: 0.2s ease-in-out opacity;
  z-index: -1;
}

.docs-main-menu--open {
  left: 0;

  .nmorph-overlay {
    opacity: 1;
  }
}

.docs-main-menu__content__scroll {
  width: max-content;
  max-width: 100%;
  height: calc(var(--container-height) + var(--footer-height)) !important;
}
</style>
