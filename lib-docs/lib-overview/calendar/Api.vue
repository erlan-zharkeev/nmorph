<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type ITranslates,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphSelectionDateType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "mark-today",
    type: "Boolean",
    default: "true",
  },
  {
    name: "initial-date",
    type: docsLink(
      "Date",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
    ),
    default: "new Date()",
  },
  {
    name: "model-value",
    type: `Array<${docsLink(
      "Date",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
    )}>[]`,
    default: "new Date()",
  },
  {
    name: "type",
    type: enumToString(NmorphSelectionDateType),
    default: "date",
  },
  {
    name: "cell-height",
    type: "Height",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [{ name: "header" }, { name: "content" }];

const variables: IVariablesTableData[] = [{ name: "table-data-cell-height" }];

const translates: ITranslates[] = [
  { name: 'sun' },
  { name: 'mon' },
  { name: 'tue' },
  { name: 'wed' },
  { name: 'thu' },
  { name: 'fri' },
  { name: 'sat' },
  { name: 'jan' },
  { name: 'feb' },
  { name: 'mar' },
  { name: 'apr' },
  { name: 'may' },
  { name: 'jun' },
  { name: 'jul' },
  { name: 'aug' },
  { name: 'sep' },
  { name: 'oct' },
  { name: 'nov' },
  { name: 'dec' }
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphCalendar" name="calendar" :attributes="attributesData" :slots="slotData"
      :variables="variables" :translates="translates" />
  </div>
</template>
