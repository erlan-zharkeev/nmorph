<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "percentage",
    type: "Number",
    default: "-",
    required: true,
  },
  {
    name: "type",
    type: "linear | circle",
    default: "linear",
  },
  {
    name: "color",
    type: "String",
    default: "var(--nmorph-info-color)",
  },
  {
    name: "value-inside",
    type: "Boolean",
    default: "false",
  },
  {
    name: "value-right-side",
    type: "Boolean",
    default: "true",
  },
  {
    name: "indeterminate",
    type: "boolean",
    default: "false",
  },
  {
    name: "circle-size",
    type: "Number",
    default: "120",
  },
];

const slotData: ISlotsTableData[] = [
  { name: "inner-text" },
  { name: "right-side" },
  { name: "circle-inner-part" },
];

const variables: IVariablesTableData[] = [
  { name: "height" },
  { name: "width-transition" },
  { name: "animation" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphProgress" name="progress" :attributes="attributesData" :slots="slotData"
      :variables="variables" />
  </div>
</template>
