<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "Number | String | undefined",
    default: "undefined",
  },
  {
    name: "max",
    type: "Number",
    default: "99",
  },
  {
    name: "type",
    type: "'default' | 'dot' | 'tag' | 'ribbon'",
    default: "default",
  },
  {
    name: "ribbon-corner",
    type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
    default: "top-right",
  },
  {
    name: "ribbon-tilt",
    type: "Boolean",
    default: "true",
  },
  {
    name: "hidden",
    type: "Boolean",
    default: "false",
  },
  {
    name: "hide-on-falsy-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "color",
    type: "Color",
    default: "var(--nmorph-accent-color)",
  },
  {
    name: "size",
    type: "'tiny' | 'extra-small' | 'base' | 'medium' | 'large' | 'extra-large'",
    default: "base",
  },
  {
    name: "ribbon-size",
    type: "Height",
    default: "undefined",
  },
  {
    name: "ribbon-radius",
    type: "Border-radius",
    default: "undefined",
  },
  {
    name: "z-index",
    type: "Number",
    default: "1",
  },
  {
    name: "offset-y",
    type: "Number",
    default: "0",
  },
  {
    name: "offset-x",
    type: "Number",
    default: "0",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }, { name: "value" }];

const variables: IVariablesTableData[] = [
  { name: "nmorph-badge-dot-size" },
  { name: "nmorph-badge-ribbon-height" },
  { name: "nmorph-badge-ribbon-radius" },
  { name: "nmorph-badge-ribbon-width" },
  { name: "nmorph-badge-ribbon-corner-size" },
  { name: "nmorph-badge-ribbon-offset-x" },
  { name: "nmorph-badge-ribbon-offset-y" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphBadge" name="badge" :attributes="attributesData" :slots="slotData" :variables="variables" />
  </div>
</template>
