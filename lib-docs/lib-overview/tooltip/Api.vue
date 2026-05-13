<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "text",
    type: "String",
    default: "-",
  },
  {
    name: "position",
    type: "top | bottom | right | left",
    default: "top",
  },
  {
    name: "force-show",
    type: "Boolean",
    default: "false",
  },
  {
    name: "force-coordinate",
    type: "{ x: String, y: String } | null",
    default: "null",
  },
  {
    name: "z-index",
    type: "Number",
    default: "-",
  },
  {
    name: "width",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "max-width",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "height",
    type: "String | Number",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [
  { name: "max-width" },
  { name: "width" },
  { name: "height" },
];
const exposes = [
  {
    name: "tooltipBody",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphTooltip" name="tooltip" :attributes="attributesData" :slots="slotData"
      :variables="variables" :exposes="exposes" />
  </div>
</template>
