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
    type: "Color",
    default: "undefined",
  },
  {
    name: "padding",
    type: "Padding",
    default: "var(--indentation-03) var(--indentation-04)",
  },
  {
    name: "border-radius",
    type: "Border-radius",
    default: "var(--default-border-radius)",
  },
  {
    name: "accent-width",
    type: "Width",
    default: "var(--indentation-02)",
  },
  {
    name: "title-gap",
    type: "Gap",
    default: "var(--indentation-03)",
  },
  {
    name: "title-font-size",
    type: "Font-size",
    default: "var(--font-size-medium)",
  },
  {
    name: "content-font-size",
    type: "Font-size",
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
