<script setup lang="ts">
import { type IAttributesTableData, type IVariablesTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphSortOrder, NmorphDivider } from "@nmorph/nmorph-ui-kit";

const tableAttributesData: IAttributesTableData[] = [
  {
    name: "data",
    type: "Record&lt;String, unknown&gt;[]",
    default: "[]",
  },
  {
    name: "row-hover",
    type: "Boolean",
    default: "true",
  },
  {
    name: "bordered",
    type: "Boolean",
    default: "false",
  },
  {
    name: "sort",
    type: `Record&lt;String, ${optionsToString(NmorphSortOrder)}&gt;`,
    default: "-",
  },
  {
    name: "design",
    type: "nmorph | plain",
    default: "nmorph",
  },
  {
    name: "virtual",
    type: "Boolean",
    default: "false",
  },
  {
    name: "virtual-height",
    type: "Height",
    default: "320px",
  },
  {
    name: "virtual-row-height",
    type: "Number",
    default: "42",
  },
  {
    name: "virtual-overscan",
    type: "Number",
    default: "5",
  },
  {
    name: "virtual-dynamic-height",
    type: "Boolean",
    default: "false",
  },
  {
    name: "border-color",
    type: "Color",
    default: "undefined",
  },
  {
    name: "cell-height",
    type: "Height",
    default: "undefined",
  },
  {
    name: "row-hover-background",
    type: "Background",
    default: "undefined",
  },
];

const tableVariables: IVariablesTableData[] = [
  { name: "border-color" },
  { name: "table-cell-height" },
  { name: "table-background-row-hover" },
];

const tableColumnAttributes: IAttributesTableData[] = [
  {
    name: "prop",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "width",
    type: "Width",
    default: "-",
  },
  {
    name: "alignment",
    type: "left | center | right",
    default: "center",
  },
];

const tableCellAttributes: IAttributesTableData[] = [
  {
    name: "row",
    type: "Number",
    default: "-",
    required: true,
  },
];
const tableCellSlots = [{ name: "default" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTable"
      name="table"
      :attributes="tableAttributesData"
      :variables="tableVariables"
    />
    <NmorphDivider />
    <div class="docs-api-table">
      <api-table
        title="NmorphTableColumn"
        name="table-column"
        :attributes="tableColumnAttributes"
        additional-id="table-column"
      />
    </div>
    <NmorphDivider />
    <div class="docs-api-table">
      <api-table
        title="NmorphTableCell"
        name="table-cell"
        :attributes="tableCellAttributes"
        :slots="tableCellSlots"
        additional-id="table-cell"
      />
    </div>
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
