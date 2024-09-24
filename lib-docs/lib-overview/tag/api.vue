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
    name: "value",
    type: "String",
    default: "-",
  },
  {
    name: "text",
    type: "String",
    default: "-",
  },
  {
    name: "removable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "transparent",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [];

const variables: IVariablesTableData[] = [];

const events = [{ name: "close", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="tag"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
