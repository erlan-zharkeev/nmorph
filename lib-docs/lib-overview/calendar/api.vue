<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
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
];

const slotData: ISlotsTableData[] = [{ name: "header" }, { name: "content" }];

const variables: IVariablesTableData[] = [{ name: "table-data-cell-height" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphCalendar"
      name="calendar"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
