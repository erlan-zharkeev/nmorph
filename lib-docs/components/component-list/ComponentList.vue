<script setup lang="ts">
import { componentGroups } from "~/data/components";
import { componentPathByName, pascalToSpace } from "~/utils";

const localePath = useLocalePath();
const router = useRouter();
const isRouteExist = (name: string) => {
  return router.resolve(componentPathByName(name)).matched.length > 0;
};
</script>

<template>
  <div class="docs-component-list">
    <div class="docs-component-list__element" v-for="category in componentGroups" :key="category.name">
      <div class="docs-component-list__element-title nmorph-title-1">
        {{ category.name }}
      </div>
      <div class="docs-component-list__element-name nmorph-body-1" v-for="componentName in category.components"
        :key="componentName">
        <div v-if="isRouteExist(componentName)">
          <div class="docs-component-list__name-element">
            <NuxtLink :to="localePath(componentPathByName(componentName))">
              {{ pascalToSpace(componentName.substring(6)) }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.docs-component-list {
  padding: 4px 4px 16px 8px;
}

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
</style>
