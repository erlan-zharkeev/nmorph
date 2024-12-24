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
    name: "model-value",
    type: "String",
    default: "-",
  },
  {
    name: "placeholder",
    type: "String",
    default: "-",
  },
  {
    name: "clearable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "list",
    type: "Array<{ value: String; [key: String]: unknown }>",
    default: "[]",
  },
  {
    name: "action-callback",
    type: "(...args: unknown[]) => Promise<unknown> | undefined",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [{ name: "loader" }];
const variables: IVariablesTableData[] = [];
const events = [
  { name: "update:model-value", type: "String" },
  { name: "select", type: "unknown" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphAutocomplete" name="autocomplete" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" />
  </div>
</template>
