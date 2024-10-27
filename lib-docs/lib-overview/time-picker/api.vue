<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "Number",
    default: "0",
  },
  {
    name: "open",
    type: "Boolean",
    default: "false",
  },
  {
    name: "init-without-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "disabled-hours",
    type: "[0-23, 0-23] | null",
    default: "null",
  },
  {
    name: "disabled-minutes",
    type: "[0-59, 0-59] | null",
    default: "null",
  },
  {
    name: "disabled-seconds",
    type: "[0-59, 0-59] | null",
    default: "null",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
const exposes = [
  {
    name: "inputDOMRef",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
const events = [
  { name: "update:model-value", type: "Number" },
  { name: "on-change-open-close", type: "Boolean" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTimePicker"
      name="time-picker"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :exposes="exposes"
      :events="events"
    />
  </div>
</template>
