<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentThickness } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "total-elements-quantity",
    type: "Number",
    default: "-",
    required: true,
  },
  {
    name: "model-value",
    type: "Number",
    default: "1",
  },
  {
    name: "elements-quantity-on-page",
    type: "Number",
    default: "2",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
    default: "basic",
  },
  {
    name: "hide-on-single-page",
    type: "Boolean",
    default: "true",
  },
  {
    name: "max-visible-pages",
    type: "Number",
    default: "9",
  },
  {
    name: "fast-forward-step",
    type: "Number",
    default: "5",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
const events = [{ name: "update:model-value", type: "Number" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphPagination"
      name="pagination"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
