<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "id",
    type: "String",
    default: "generated",
  },
  {
    name: "name",
    type: "String",
    default: "id",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "Boolean | String | Number",
    default: "false",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "active-value",
    type: "Boolean | String | Number",
    default: "true",
  },
  {
    name: "inactive-value",
    type: "Boolean | String | Number",
    default: "false",
  },
  {
    name: "width",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "height",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "offset",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "thumb-height",
    type: "String | Number",
    default: "undefined",
  },
];
const slotData: ISlotsTableData[] = [
  { name: "bg-on" },
  { name: "bg-off" },
  { name: "thumb-on" },
  { name: "thumb-off" },
];
const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "height" },
  { name: "offset" },
  { name: "thumb-height" },
];
const events = [
  { name: "update:model-value", type: "Boolean | String | Number" },
];
const exposes = [
  {
    name: "inputDOMRef",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphSwitch" name="switch" :attributes="attributesData" :slots="slotData" :variables="variables"
      :exposes="exposes" :events="events" />
  </div>
</template>
