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
    default: '"one-time-code"',
  },
  {
    name: "tabindex",
    type: "Number",
    default: "0",
  },
  {
    name: "model-value",
    type: "String",
    default: '""',
  },
  {
    name: "length",
    type: "Number",
    default: "6",
  },
  {
    name: "mode",
    type: '"numeric" | "text" | "alphanumeric"',
    default: '"numeric"',
  },
  {
    name: "autocapitalize",
    type: "String",
    default: '"none"',
  },
  {
    name: "autofocus",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
const events = [
  { name: "update:model-value", type: "String" },
  { name: "focus", type: "void" },
  { name: "blur", type: "void" },
  { name: "complete", type: "String" },
];
const exposes = [
  {
    name: "inputDOMRefs",
    type: `Array<${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null>`,
  },
  {
    name: "focus",
    type: "(index?: number) => void",
  },
  {
    name: "blur",
    type: "() => void",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphOTPInput"
      name="otp-input"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
      :exposes="exposes"
    />
  </div>
</template>
