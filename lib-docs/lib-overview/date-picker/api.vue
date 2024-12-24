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
    name: "model-value",
    type: `${date} | Array<${date}>[]`,
    default: "-",
    required: true,
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
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [{ name: "width" }];

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
