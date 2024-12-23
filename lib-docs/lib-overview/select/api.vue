<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphComponentHeight, NmorphDivider } from "@nmorph/nmorph-ui-kit";

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
      "/components/select#content-select-option-attributes"
    )}>`,
    default: "[]",
  },
  {
    name: "options-map",
    type: `Array<${docsLink(
      "INmorphSelectOption",
      "/components/select#content-select-option-attributes"
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
    default: "true",
  },
  {
    name: "open",
    type: "Boolean",
    default: "false",
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
    default: "default",
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

const translates = [{ name: 'noElementPlaceholder' }]
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphSelect" name="select" :attributes="attributesData" :slots="slotData" :variables="variables"
      :events="events" :translates="translates" />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table title="NmorphSelectOption" name="select-option" additional-id="select-option"
      :attributes="selectOptionAttr" :slots="slotSelectOptionData" :variables="variablesSelectOption"
      :events="eventsSelectOption" />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
