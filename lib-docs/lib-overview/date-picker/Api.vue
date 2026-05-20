<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphComponentHeight,
  NmorphSelectionDateType,
} from "@nmorph/nmorph-ui-kit";

const date = `${docsLink(
  "Date",
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
)}`;

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
    name: "model-value",
    type: `${date} | Array<${date}>[]`,
    default: "-",
    required: true,
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "basic",
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
    name: "placeholder",
    type: "String",
    default: "Pick a date",
  },
  {
    name: "type",
    type: enumToString(NmorphSelectionDateType),
    default: "date",
  },
  {
    name: "text-separator",
    type: "String",
    default: "To",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "date-locale",
    type: "String | Array<String>",
    default: "en-CA",
  },
  {
    name: "date-format-options",
    type: "Intl.DateTimeFormatOptions",
    default: "{ year: 'numeric', month: '2-digit', day: '2-digit' }",
  },
  {
    name: "date-format",
    type: "String",
    default: "-",
  },
  {
    name: "date-formatter",
    type: "(date: Date) => string",
    default: "-",
  },
  {
    name: "value-separator",
    type: "String",
    default: ", ",
  },
  {
    name: "range-separator",
    type: "String",
    default: " - ",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
  },
  {
    name: "calendar-cell-height",
    type: "Height",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "date-picker-calendar-cell-height" },
];

const events = [
  { name: "update:model-value", type: `${date} | Array<${date}>[]` },
];

const translates = [{ name: 'pickADate' }]
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphDatePicker" name="date-picker" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" :translates="translates" />
  </div>
</template>
