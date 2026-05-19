<script setup lang="ts">
import ApiTable from "~/components/api-table/ApiTable.vue";
import type { IAttributesTableData, ISlotsTableData, IVariablesTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "type",
    type: "'info' | 'warning' | 'success' | 'error'",
    default: "info",
  },
  {
    name: "title",
    type: "String",
    default: "''",
  },
  {
    name: "content",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "color",
    type: "String",
    default: "undefined",
  },
  {
    name: "padding",
    type: "Number | String",
    default: "var(--indentation-03) var(--indentation-04)",
  },
  {
    name: "border-radius",
    type: "Number | String",
    default: "var(--default-border-radius)",
  },
  {
    name: "accent-width",
    type: "Number | String",
    default: "var(--indentation-02)",
  },
  {
    name: "title-gap",
    type: "Number | String",
    default: "var(--indentation-03)",
  },
  {
    name: "title-font-size",
    type: "Number | String",
    default: "var(--font-size-medium)",
  },
  {
    name: "content-font-size",
    type: "Number | String",
    default: "var(--font-size-extra-small)",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [
  { name: "callout-color" },
  { name: "callout-padding" },
  { name: "callout-border-radius" },
  { name: "callout-accent-width" },
  { name: "callout-title-gap" },
  { name: "callout-title-font-size" },
  { name: "callout-content-font-size" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphCallout"
      name="callout"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
