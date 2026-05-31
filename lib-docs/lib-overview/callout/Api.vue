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
    default: "''",
  },
  {
    name: "as",
    type: "keyof HTMLElementTagNameMap",
    default: "div",
  },
  {
    name: "href",
    type: "String",
    default: "undefined",
  },
  {
    name: "target",
    type: "'_self' | '_blank' | '_parent' | '_top' | 'self' | 'blank' | 'parent' | 'top'",
    default: "undefined",
  },
  {
    name: "rel",
    type: "String",
    default: "undefined",
  },
  {
    name: "referrerpolicy",
    type: "String",
    default: "undefined",
  },
  {
    name: "download",
    type: "String | Boolean",
    default: "undefined",
  },
  {
    name: "aria-label",
    type: "String",
    default: "undefined",
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

const slotData: ISlotsTableData[] = [
  {
    name: "header",
  },
  {
    name: "title",
  },
  {
    name: "default",
  },
];
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
