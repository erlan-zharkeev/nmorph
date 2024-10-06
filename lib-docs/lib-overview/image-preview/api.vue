<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "alt",
    type: "String",
    default: "-",
  },
  {
    name: "initial-index",
    type: "Number",
    default: "0",
  },
  {
    name: "src",
    type: "string | string[]",
    default: "-",
    required: true,
  },
  {
    name: "scale-step",
    type: "Number",
    default: "0.2",
  },
  {
    name: "min-scale-level",
    type: "Number",
    default: "0.2",
  },
  {
    name: "max-scale-level",
    type: "Number",
    default: "4",
  },
];

const slotData: ISlotsTableData[] = [];

const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "height" },
];

const events = [
  {
    name: "update:model-value",
    type: "Boolean",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphImagePreview"
      name="image-preview"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
