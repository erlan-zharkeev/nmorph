<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight, NmorphDivider } from "@nmorph/nmorph-ui-kit";

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
    name: "no-element-placeholder",
    type: "String",
    default: "Choose value",
  },
  {
    name: "value-required",
    type: "Boolean",
    default: "",
  },
  {
    name: "options",
    type: `Array<${docsLink(
      "INmorphSelectOption",
      "/components/select#content-select-option-attributes",
    )}>`,
    default: "[]",
  },
  {
    name: "options-map",
    type: `Array<${docsLink(
      "INmorphSelectOption",
      "/components/select#content-select-option-attributes",
    )}>`,
    default: "[]",
  },
  {
    name: "model-value",
    type: "String | Array&lt;String&gt;",
    default: "-",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "fill",
    type: "Boolean",
    default: "false",
  },
  {
    name: "options-width",
    type: "'truncate' | 'auto'",
    default: "truncate",
  },
  {
    name: "open",
    type: "Boolean",
    default: "false",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "virtual",
    type: "Boolean",
    default: "false",
  },
  {
    name: "virtual-item-height",
    type: "Number",
    default: "auto by height",
  },
  {
    name: "virtual-max-height",
    type: "Number | String",
    default: "240",
  },
  {
    name: "virtual-overscan",
    type: "Number",
    default: "5",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [{ name: "base-width" }];
const events = [
  { name: "update:model-value", type: "String | Array&lt;String&gt;" },
];

const selectOptionAttr = [
  {
    name: "label",
    type: "String",
    default: "-",
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
];
const slotSelectOptionData: ISlotsTableData[] = [{ name: "default" }];
const variablesSelectOption: IVariablesTableData[] = [
  { name: "hover-bg" },
  { name: "hover-color" },
];
const eventsSelectOption = [{ name: "change-value", type: "String" }];

const translates = [{ name: "noElementPlaceholder" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphSelect"
      name="select"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
      :translates="translates"
    />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table
      title="NmorphSelectOption"
      name="select-option"
      additional-id="select-option"
      :attributes="selectOptionAttr"
      :slots="slotSelectOptionData"
      :variables="variablesSelectOption"
      :events="eventsSelectOption"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
