<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

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
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
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
    type: "Number",
    default: "0",
  },
  {
    name: "max",
    type: "Number",
    default: "Infinity",
  },
  {
    name: "min",
    type: "Number",
    default: "-Infinity",
  },
  {
    name: "step",
    type: "Number",
    default: "1",
  },
  {
    name: "action-btn-position-right",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
const events = [{ name: "update:model-value", type: "Number" }];
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
    <api-table title="NmorphNumberInput" name="number-input" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" :exposes="exposes" />
  </div>
</template>
