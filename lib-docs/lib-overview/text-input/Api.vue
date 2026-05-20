<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "id",
    type: "String",
    default: "generated",
  },
  {
    name: "name",
    type: "String",
    default: "id",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "basic",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "autocomplete",
    type: "String",
    default: "-",
  },
  {
    name: "tabindex",
    type: "Number",
    default: "0",
  },
  {
    name: "placeholder",
    type: "String",
    default: "-",
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "type-password",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "String",
    default: "-",
  },
  {
    name: "clearable",
    type: "Boolean",
    default: "false",
  },
  {
    name: "indentation",
    type: "String",
    default: "auto",
  },
  {
    name: "input-attrs",
    type: "Object",
    default: "{}",
  },
];

const slotData: ISlotsTableData[] = [{ name: "prepend-icon" }];
const variables: IVariablesTableData[] = [{ name: "prepend-icon-indent" }];
const events = [
  { name: "update:model-value", type: "String" },
  { name: "focus", type: "void" },
  { name: "blur", type: "void" },
  { name: "on-enter", type: "void" },
];

const exposes = [
  {
    name: "inputDOMRef",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
  {
    name: "focus",
    type: "void",
  },
  {
    name: "blur",
    type: "void",
  },
  {
    name: "select",
    type: "void",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphTextInput" name="text-input" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" :exposes="exposes" />
  </div>
</template>
