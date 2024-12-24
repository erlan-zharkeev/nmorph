<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
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
    name: "width",
    type: "Number",
    default: "160",
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
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const eventsData = [{ name: "on-outside-click", type: "void" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphDropdown" name="dropdown" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="eventsData" />
  </div>
</template>
