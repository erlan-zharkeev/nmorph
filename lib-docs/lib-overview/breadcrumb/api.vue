<script setup lang="ts">
import { type IAttributesTableData } from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const breadcrumbAttributesData: IAttributesTableData[] = [
  {
    name: "separator",
    type: "String",
    default: "/",
  },
];

const breadcrumbItemAttributesData: IAttributesTableData[] = [
  {
    name: "to",
    type: "String",
    default: "-",
  },
  {
    name: "replace",
    type: "Boolean",
    default: "false",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphBreadcrumb"
      name="breadcrumb"
      :attributes="breadcrumbAttributesData"
    />
    <NmorphDivider />
    <div class="docs-api-table">
      <api-table
        title="NmorphBreadcrumbItem"
        name="breadcrumb-item"
        :attributes="breadcrumbItemAttributesData"
        additional-id="breadcrumb-item"
      />
    </div>
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
