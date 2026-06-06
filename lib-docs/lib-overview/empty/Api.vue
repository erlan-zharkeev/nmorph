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
    name: "title",
    type: "string",
    default: "No data",
  },
  {
    name: "description",
    type: "string",
    default: "''",
  },
  {
    name: "icon-size",
    type: "Length",
    default: "56",
  },
  {
    name: "min-height",
    type: "Min-height",
    default: "160",
  },
  {
    name: "padding",
    type: "Padding",
    default: "var(--indentation-05)",
  },
  {
    name: "design",
    type: "'nmorph' | 'plain'",
    default: "nmorph",
  },
  {
    name: "shadow-type",
    type: optionsToString(NmorphShadowType),
    default: "inset",
  },
  {
    name: "hide-icon",
    type: "boolean",
    default: "false",
  },
  {
    name: "role",
    type: "string",
    default: "status",
  },
  {
    name: "aria-label",
    type: "string",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [
  { name: "icon" },
  { name: "title" },
  { name: "description" },
  { name: "action" },
];

const variables: IVariablesTableData[] = [
  { name: "nmorph-empty-icon-size" },
  { name: "nmorph-empty-min-height" },
  { name: "nmorph-empty-padding" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphEmpty"
      name="empty"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
