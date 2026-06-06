<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import { NmorphElementDesign } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "open",
    type: "Boolean",
    default: "-",
    required: true,
  },
  {
    name: "relative-element",
    type: "HTMLElement | null",
    default: "null",
    required: true,
  },
  {
    name: "placement",
    type: `"top" | "top-start" | "top-center" | "top-end" | "right" | "right-start" | "right-center" | "right-end" | "bottom" | "bottom-start" | "bottom-center" | "bottom-end" | "left" | "left-start" | "left-center" | "left-end"`,
    default: "bottom",
  },
  {
    name: "width",
    type: "Width",
    default: "160",
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
  {
    name: "trap-focus",
    type: "Boolean",
    default: "false",
  },
  {
    name: "restore-focus",
    type: "Boolean",
    default: "true",
  },
  {
    name: "role",
    type: "String",
    default: "listbox",
  },
  {
    name: "aria-label",
    type: "String",
    default: "-",
  },
  {
    name: "content-class",
    type: "String",
    default: "-",
  },
  {
    name: "hide-shadow",
    type: "Boolean",
    default: "false",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
    description: "Dropdown surface design. Plain dropdowns use a visible border and no nmorph shadow.",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const eventsData = [{ name: "on-outside-click", type: "void" }, { name: "on-escape-keydown", type: "void" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphDropdown"
      name="dropdown"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="eventsData"
    />
  </div>
</template>
