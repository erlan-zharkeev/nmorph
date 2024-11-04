<script setup lang="ts">
import { NmorphBreadcrumb, NmorphBreadcrumbItem } from "@nmorph/nmorph-ui-kit";

import CodeSlotData from "~/components/code-slot-data/code-slot-data.vue";

const scriptData = `
<script lang="ts" setup>
  const elements = [
    { name: "main", path: "/" },
    { name: "components", path: "/components" },
    { name: "breadcrumb", path: "/components/breadcrumb" },
  ];
<\/script>
`;
const templateData = `
<template>
  <NmorphBreadcrumb separator="/">
  <NmorphBreadcrumbItem
    v-for="el in elements"
    :key="el.path"
    :to="el.path"
    >{{ el.name }}</NmorphBreadcrumbItem
  >
  </NmorphBreadcrumb>
</template>
`;
const cssData = "";
const code = [scriptData, templateData, cssData];

const elements = [
  { name: "main", path: "/" },
  { name: "components", path: "/components" },
  { name: "breadcrumb", path: "/components/breadcrumb" },
];
</script>

<template>
  <div id="content-basic-usage">
    <attribute :header="$t('overview.basic-usage')" :codeToCopy="code">
      <template #overview>
        <div class="breadcrumb-basic-usage-overview">
          <ClientOnly>
            <NmorphBreadcrumb separator="/">
              <NmorphBreadcrumbItem
                v-for="el in elements"
                :key="el.path"
                :to="el.path"
                >{{ el.name }}</NmorphBreadcrumbItem
              >
            </NmorphBreadcrumb>
          </ClientOnly>
        </div>
      </template>
      <template #code>
        <code-slot-data
          :template-data="templateData"
          :script-data="scriptData"
          :css-data="cssData"
        />
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.breadcrumb-basic-usage-overview {
}
</style>
