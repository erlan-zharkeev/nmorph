<script setup lang="ts">
import { NmorphBreadcrumb, NmorphBreadcrumbItem } from "@nmorph/nmorph-ui-kit";

const elements = [
  { name: "main", path: "/" },
  { name: "components", path: "/components" },
  { name: "breadcrumb", path: "/elements/breadcrumb" },
];
</script>

<template>
  <div class="breadcrumb-basic-usage-overview">
    <ClientOnly>
      <NmorphBreadcrumb separator="/">
        <NmorphBreadcrumbItem
          v-for="el in elements"
          :key="el.path"
          :to="el.path"
          >{{ el.name }}
        </NmorphBreadcrumbItem>
      </NmorphBreadcrumb>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.breadcrumb-basic-usage-overview {
}
</style>
