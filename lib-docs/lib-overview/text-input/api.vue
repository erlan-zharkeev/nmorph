<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
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
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTextInput"
      name="text-input"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
      :exposes="exposes"
    />
  </div>
</template>
