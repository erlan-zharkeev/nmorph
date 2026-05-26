<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type IExposesTableData,
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
    type: `"contextmenu" | "click" | "both" | "longpress" | "manual"`,
    default: "contextmenu",
  },
  {
    name: "options",
    type: "Array<String | Number | Object>",
    default: "[]",
  },
  {
    name: "placement",
    type: `"top" | "top-start" | "top-center" | "top-end" | "right" | "right-start" | "right-center" | "right-end" | "bottom" | "bottom-start" | "bottom-center" | "bottom-end" | "left" | "left-start" | "left-center" | "left-end"`,
    default: "bottom-start",
  },
  {
    name: "width",
    type: "Width",
    default: "max-content",
  },
  {
    name: "min-width",
    type: "Min-width",
    default: "-",
  },
  {
    name: "max-width",
    type: "Max-width",
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
    name: "close-on-scroll",
    type: "Boolean",
    default: "true",
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
  {
    name: "hide-shadow",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }, { name: "menu" }];
const variables: IVariablesTableData[] = [];
const exposes: IExposesTableData[] = [
  { name: "openAt", type: "(x: Number, y: Number, event?: Event) => void" },
  {
    name: "openAtElement",
    type: "(element: HTMLElement, event?: Event) => void",
  },
  { name: "close", type: "void" },
];
const eventsData: IEventsTableData[] = [
  { name: "update:model-value", type: "Boolean" },
  { name: "open", type: "Event | undefined" },
  { name: "close", type: "void" },
  { name: "select", type: "NmorphContextMenuOption, Number" },
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
      :exposes="exposes"
      :events="eventsData"
    />
  </div>
</template>
