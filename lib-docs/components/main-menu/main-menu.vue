<script setup lang="ts">
import { NmorphOverlay } from "@nmorph/nmorph-ui-kit";
import ComponentList from "~/components/component-list/component-list.vue";

interface IProps {
  isMenuOpen: boolean;
}
const props = withDefaults(defineProps<IProps>(), {});
interface INmorphEmit {
  (e: "menu-click"): void;
}
const emit = defineEmits<INmorphEmit>();
</script>

<template>
  <div
    class="docs-main-menu"
    :class="{ 'docs-main-menu--open': props.isMenuOpen }"
    @click="emit('menu-click')"
  >
    <div class="nmorph-inset docs-main-menu__content">
      <component-list />
    </div>
    <NmorphOverlay
      :show="props.isMenuOpen"
      @on-outside-click="emit('menu-click')"
    />
  </div>
</template>

<style scoped lang="scss">
$transition: 0.2s ease-in-out left;

.nmorph-inset {
  display: inline-flex;
}

.docs-main-menu__content {
  width: 30%;
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
</style>
