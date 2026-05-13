<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type ITranslates,
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
    name: "model-value",
    type: "String | null",
    default: "null",
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
    name: "placeholder",
    type: "String",
    default: "Pick a time",
  },
  {
    name: "hour-step",
    type: "Number",
    default: "1",
  },
  {
    name: "minute-step",
    type: "Number",
    default: "5",
  },
  {
    name: "second-step",
    type: "Number",
    default: "1",
  },
  {
    name: "show-seconds",
    type: "Boolean",
    default: "false",
  },
  {
    name: "min-time",
    type: "String",
    default: "-",
  },
  {
    name: "max-time",
    type: "String",
    default: "-",
  },
  {
    name: "clearable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "width",
    type: "String | Number",
    default: "undefined",
  },
];

const events: IEventsTableData[] = [
  {
    name: "update:model-value",
    type: "String | null",
  },
  {
    name: "focus",
    type: "void",
  },
  {
    name: "blur",
    type: "void",
  },
];

const translates: ITranslates[] = [{ name: "pickATime" }];
const variables: IVariablesTableData[] = [{ name: "width" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTimePicker"
      name="time-picker"
      :attributes="attributesData"
      :events="events"
      :variables="variables"
      :translates="translates"
    />
  </div>
</template>
