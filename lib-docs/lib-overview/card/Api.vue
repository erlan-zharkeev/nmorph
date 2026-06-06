<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphShadowType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "shadow-type",
    type: optionsToString(NmorphShadowType),
    default: "outset",
  },
  {
    name: "card-padding",
    type: "Padding",
    default: "undefined",
  },
  {
    name: "padding",
    type: "Padding",
    default: "undefined",
  },
  {
    name: "radius",
    type: "Border-radius",
    default: "undefined",
  },
  {
    name: "content-padding",
    type: "Padding",
    default: "undefined",
  },
  {
    name: "content-class",
    type: "string",
    default: "-",
  },
  {
    name: "combined-shadow-border-width",
    type: "Border-width",
    default: "0",
  },
  {
    name: "fill",
    type: "boolean",
    default: "true",
  },
  {
    name: "tag",
    type: "string",
    default: "div",
  },
];

const slotData: ISlotsTableData[] = [{ name: "header" }, { name: "footer" }];

const variables: IVariablesTableData[] = [
  { name: "card-padding" },
  { name: "nmorph-card-radius" },
  { name: "nmorph-card-content-padding" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphCard" name="card" :attributes="attributesData" :slots="slotData" :variables="variables" />
  </div>
</template>
