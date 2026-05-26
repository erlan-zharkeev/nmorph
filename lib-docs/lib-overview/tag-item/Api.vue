<script setup lang="ts">
import { type IAttributesTableData, type IEventsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "text",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "removable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "basic",
  },
  {
    name: "design",
    type: "nmorph, common",
    default: "nmorph",
  },
  {
    name: "color",
    type: "String",
    default: "var(--nmorph-gray-color)",
    description:
      "Background color for common design. Use token values such as var(--nmorph-success-color).",
  },
];

const events: IEventsTableData[] = [
  { name: "click", type: "String" },
  { name: "close", type: "String" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTagItem"
      name="tag-item"
      :attributes="attributesData"
      :events="events"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
