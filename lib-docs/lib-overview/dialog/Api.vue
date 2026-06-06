<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "title",
    type: "String",
    default: "-",
  },
  {
    name: "width",
    type: "Width",
    default: "330px",
  },
  {
    name: "max-width",
    type: "Max-width",
    default: "calc(100vw - 32px)",
    description: "Maximum dialog width.",
  },
  {
    name: "max-height",
    type: "Max-height",
    default: "calc(100dvh - 32px)",
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
    name: "close-on-click-modal",
    type: "Boolean",
    default: "true",
  },
  {
    name: "close-on-overlay",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-close",
    type: "Boolean",
    default: "true",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "close-on-escape",
    type: "Boolean",
    default: "true",
  },
];

const slotData: ISlotsTableData[] = [{ name: "header" }, { name: "default" }];
const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "nmorph-dialog-max-height" },
  { name: "nmorph-dialog-max-width" },
];
const events = [
  { name: "on-close", type: "void" },
  { name: "update:model-value", type: "Boolean" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphDialog" name="dialog" :attributes="attributesData" :slots="slotData" :variables="variables"
      :events="events" />
  </div>
</template>
