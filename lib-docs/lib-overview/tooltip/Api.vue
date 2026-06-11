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
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "trigger",
    type: "'hover' | 'click' | 'manual'",
    default: "hover",
  },
  {
    name: "touch",
    type: "'disable' | 'click' | 'longpress'",
    default: "click",
  },
  {
    name: "open-delay",
    type: "Number",
    default: "0",
  },
  {
    name: "close-delay",
    type: "Number",
    default: "0",
  },
  {
    name: "z-index",
    type: "Number",
    default: "-",
  },
  {
    name: "teleport-to",
    type: "String | HTMLElement",
    default: "body",
  },
  {
    name: "disabled-teleport",
    type: "Boolean",
    default: "true",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
  },
  {
    name: "max-width",
    type: "Max-width",
    default: "undefined",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }, { name: "content" }];
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
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement",
    )} | null`,
  },
  { name: "open", type: "() => void" },
  { name: "close", type: "() => void" },
  { name: "toggle", type: "() => void" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTooltip"
      name="tooltip"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :exposes="exposes"
    />
  </div>
</template>
