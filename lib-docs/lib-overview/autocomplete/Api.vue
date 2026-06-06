<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphComponentThickness,
  NmorphElementDesign,
} from "@nmorph/nmorph-ui-kit";

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
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
    default: "basic",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "autocomplete",
    type: "String",
    default: "-",
  },
  {
    name: "model-value",
    type: "String",
    default: "-",
  },
  {
    name: "placeholder",
    type: "String",
    default: "-",
  },
  {
    name: "clearable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "list",
    type: "Array<{ value: String; [key: String]: unknown }>",
    default: "[]",
  },
  {
    name: "action-callback",
    type: "(...args: unknown[]) => Promise<unknown> | undefined",
    default: "undefined",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "virtual",
    type: "Boolean",
    default: "false",
  },
  {
    name: "virtual-item-height",
    type: "Number",
    default: "auto by thickness",
  },
  {
    name: "virtual-max-height",
    type: "Max-height",
    default: "240",
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
];

const slotData: ISlotsTableData[] = [{ name: "loader" }];
const variables: IVariablesTableData[] = [];
const events = [
  { name: "update:model-value", type: "String" },
  { name: "select", type: "unknown" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphAutocomplete"
      name="autocomplete"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
