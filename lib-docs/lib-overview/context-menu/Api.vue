<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean | null",
    default: "-",
  },
  {
    name: "trigger",
    type: `"contextmenu" | "click" | "both"`,
    default: "contextmenu",
  },
  {
    name: "placement",
    type: `"top" | "top-start" | "top-center" | "top-end" | "right" | "right-start" | "right-center" | "right-end" | "bottom" | "bottom-start" | "bottom-center" | "bottom-end" | "left" | "left-start" | "left-center" | "left-end"`,
    default: "bottom-start",
  },
  {
    name: "width",
    type: "Number | String",
    default: "160",
  },
  {
    name: "min-width",
    type: "Number | String",
    default: "-",
  },
  {
    name: "max-width",
    type: "Number | String",
    default: "-",
  },
  {
    name: "x-offset",
    type: "Number",
    default: "0",
  },
  {
    name: "y-offset",
    type: "Number",
    default: "0",
  },
  {
    name: "fill-width",
    type: "Boolean",
    default: "false",
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
  {
    name: "trap-focus",
    type: "Boolean",
    default: "false",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "role",
    type: "String",
    default: "menu",
  },
  {
    name: "aria-label",
    type: "String",
    default: "-",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }, { name: "menu" }];
const variables: IVariablesTableData[] = [];
const eventsData: IEventsTableData[] = [
  { name: "update:model-value", type: "Boolean" },
  { name: "open", type: "MouseEvent | KeyboardEvent" },
  { name: "close", type: "void" },
  { name: "on-outside-click", type: "void" },
  { name: "on-escape-keydown", type: "void" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphContextMenu"
      name="context-menu"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="eventsData"
    />
  </div>
</template>
