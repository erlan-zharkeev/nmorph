<script setup lang="ts">
import { NmorphBadge, NmorphScroll } from "@nmorph/nmorph-ui-kit";

const list: { name: string; components: string[] }[] = [
  {
    name: "basic",
    components: ["NmorphButton", "NmorphIcon", "NmorphLink", "NmorphScroll"],
  },

  {
    name: "data",
    components: [
      "NmorphAvatar",
      "NmorphBadge",
      "NmorphCard",
      "NmorphImage",
      "NmorphTag",
      "NmorphSkeleton",
    ],
  },
];

const tagData: { [key in string]: "E" | "W" } = {
  NmorphTag: "E",
  NmorphSkeleton: "W",
};

const localePath = useLocalePath();
const router = useRouter();
const isRouteExist = (name: string) =>
  router.resolve(componentPathByName(name)).matched.length > 0;
</script>

<template>
  <div class="docs-component-list">
    <NmorphScroll class="docs-component-list__scroll">
      <div
        class="docs-component-list__element"
        v-for="category in list"
        :key="category.name"
      >
        <div class="docs-component-list__element-title nmorph-title-1">
          {{ category.name }}
        </div>
        <div
          class="docs-component-list__element-name nmorph-body-1"
          v-for="componentName in category.components"
          :key="componentName"
        >
          <div v-if="isRouteExist(componentName)">
            <div class="docs-component-list__name-element">
              <NuxtLink :to="localePath(componentPathByName(componentName))">
                {{ componentName.substring(6) }}
              </NuxtLink>
              <div
                v-if="tagData[componentName]"
                class="docs-component-list__tag-text"
              >
                {{ tagData[componentName] }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NmorphScroll>
  </div>
</template>

<style lang="scss">
.docs-component-list__element-title {
  text-transform: capitalize;
}

.docs-component-list__name-element {
  display: flex;
}

.docs-component-list__element-name {
  padding-left: 16px;
  padding: 4px 4px 4px 16px;
  cursor: pointer;
  a {
    &.router-link-exact-active {
      font-weight: 800;
    }
  }
}

.docs-component-list__scroll {
  height: var(--aside-container-height);
}

.docs-component-list__tag-text {
  color: unset;
  margin-left: 8px;
  background-color: var(--nmorph-success-color);
  padding: 0 6px;
  border-radius: 4px;
  color: var(--nmorph-white-color);
  font-size: 10px;
  display: flex;
  align-items: center;
}
</style>
