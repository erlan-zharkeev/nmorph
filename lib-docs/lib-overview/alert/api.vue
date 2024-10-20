<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphAlertType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "id",
    type: "Number",
    default: "-",
  },
  {
    name: "type",
    type: enumToString(NmorphAlertType),
    default: "info",
  },
  {
    name: "closable",
    type: "Boolean",
    default: "false",
  },
  {
    name: "title",
    type: "String",
    default: "-",
  },
  {
    name: "content",
    type: "String",
    default: "-",
  },
  {
    name: "fill",
    type: "Boolean",
    default: "false",
  },
  {
    name: "show-icon",
    type: "Boolean",
    default: "true",
  },
  {
    name: "bordered",
    type: "Boolean",
    default: "true",
  },
  {
    name: "html",
    type: "String",
    default: "-",
  },
  {
    name: "close-icon-position",
    type: docsLink(
      "Align self",
      "https://developer.mozilla.org/en-US/docs/Web/CSS/align-self"
    ),
    default: "center",
  },
];

const slotData: ISlotsTableData[] = [
  { name: "icon" },
  { name: "title" },
  { name: "default" },
];
const variables: IVariablesTableData[] = [];
const events = [{ name: "close", type: "() => void" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphAlert"
      name="alert"
      :events="events"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
