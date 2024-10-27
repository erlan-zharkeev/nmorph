<script setup lang="ts">
import { NmorphBreadcrumb, NmorphBreadcrumbItem } from "@nmorph/nmorph-ui-kit";

const scriptData = "";
const templateData = "";
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
        <code-example v-if="templateData" lang="html">{{
          templateData
        }}</code-example>
        <code-example v-if="scriptData" lang="javascript">{{
          scriptData
        }}</code-example>
        <code-example v-if="cssData" lang="css">{{ cssData }}</code-example>
      </template>
    </attribute>
  </div>
</template>

<style lang="scss">
.breadcrumb-basic-usage-overview {
}
</style>
