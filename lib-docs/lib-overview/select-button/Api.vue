<script setup lang="ts">
import {
  NmorphComponentThickness,
  NmorphElementDesign,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { optionsToString } from "~/utils";
import type { IAttributesTableData, ISlotsTableData, IVariablesTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String",
    default: "-",
    required: true,
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
    name: "fill",
    type: "Boolean",
    default: "false",
  },
  {
    name: "options",
    type: `Array<INmorphSelectButtonOption>`,
    default: "[]",
  },
  {
    name: "track-padding",
    type: "Padding",
    default: "undefined",
  },
  {
    name: "item-size",
    type: "Length",
    default: "undefined",
  },
  {
    name: "item-font-size",
    type: "Font-size",
    default: "undefined",
  },
  {
    name: "item-line-height",
    type: "Line-height",
    default: "undefined",
    description: "Line height for select button items.",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [
  { name: "track-padding" },
  { name: "item-size" },
  { name: "item-font-size" },
];
const events = [{ name: "update:model-value", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphSelectButton"
      name="select-button"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
