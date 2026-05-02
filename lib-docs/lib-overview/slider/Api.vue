<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

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
    name: "fill",
    type: "Boolean",
    default: "true",
  },
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
    name: "max",
    type: "Number",
    default: "100",
  },
  {
    name: "min",
    type: "Number",
    default: "0",
  },
  {
    name: "step",
    type: "Number",
    default: "1",
  },
  {
    name: "show-tooltip",
    type: "Boolean",
    default: "true",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [
  { name: "slider-height" },
  { name: "value-fixed-container-height" },
];
const events = [{ name: "update:model-value", type: "Number" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphSlider" name="slider" :attributes="attributesData" :slots="slotData" :variables="variables"
      :events="events" />
  </div>
</template>
