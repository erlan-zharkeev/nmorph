<script setup lang="ts">
import { NmorphScroll } from "@nmorph/nmorph-ui-kit";
import componentsList from "./components-list.json";
import type { IComponentList } from "./types";
const list = componentsList as IComponentList[];
const localePath = useLocalePath();
const router = useRouter();
const isRouteExist = (path: string) => {
  const route = router.resolve(
    `/components/docs-${path.substring(6).toLowerCase()}`
  );
  return route.matched.length > 0;
};
</script>

<template>
  <div class="docs-components-list">
    <NmorphScroll class="docs-components-list__scroll">
      <div
        class="docs-components-list__element"
        v-for="category in list"
        :key="category.name"
      >
        <div class="docs-components-list__element-title nmorph-title-1">
          {{ category.name }}
        </div>
        <!-- <div
          class="docs-components-list__element-name nmorph-body-1"
          v-for="componentName in category.components"
          :key="componentName"
        >
          <div v-if="isRouteExist(componentName)">
            <NuxtLink
              :to="
                localePath(
                  `/components/docs-${componentName.substring(6).toLowerCase()}`
                )
              "
            >
              {{ componentName.substring(6) }}
            </NuxtLink>
          </div>
        </div> -->
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-components-list__element-title {
  text-transform: capitalize;
}
.docs-components-list__element-name {
  padding-left: 16px;
  padding: 4px 4px 4px 16px;
  cursor: pointer;
  a {
    &.router-link-exact-active {
      font-weight: 800;
      color: var(--accent-color-00);
      padding-left: 8px;
    }
  }
}
.docs-components-list__scroll {
  height: var(--aside-container-height);
}
</style>
