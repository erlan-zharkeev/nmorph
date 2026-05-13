<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "src",
    type: "String | Array&lt;String&gt;",
    default: "-",
    required: true,
  },
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
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "show-trigger",
    type: "Boolean",
    default: "true",
  },
  {
    name: "width",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "height",
    type: "String | Number",
    default: "undefined",
  },
  {
    name: "navigation-button-margin",
    type: "String | Number",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [
  { name: "loading" },
  { name: "error" },
];

const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "height" },
  { name: "nmorph-image-preview-btn-margin" },
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
    <api-table title="NmorphImagePreview" name="image-preview" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" />
  </div>
</template>
