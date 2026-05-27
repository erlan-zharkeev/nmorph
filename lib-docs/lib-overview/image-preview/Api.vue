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
    name: "show-navigation-buttons",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-action-bar",
    type: "Boolean",
    default: "true",
  },
  {
    name: "trigger-view",
    type: "'single' | 'gallery'",
    default: "single",
  },
  {
    name: "trigger-limit",
    type: "Number",
    default: "undefined",
  },
  {
    name: "trigger-gap",
    type: "Gap",
    default: "8",
  },
  {
    name: "fit",
    type: "'cover' | 'contain'",
    default: "cover",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
  },
  {
    name: "radius",
    type: "Border-radius",
    default: "undefined",
  },
  {
    name: "navigation-button-margin",
    type: "Margin",
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
  { name: "nmorph-image-preview-radius" },
  { name: "nmorph-image-preview-btn-margin" },
  { name: "nmorph-image-preview-trigger-gap" },
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
