<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "right",
    type: "Number",
    default: "40",
  },
  {
    name: "bottom",
    type: "Number",
    default: "40",
  },
  {
    name: "visibility-height",
    type: "Number",
    default: "200",
  },
  {
    name: "design",
    type: "nmorph | plain",
    default: "nmorph",
  },
  {
    name: "z-index",
    type: "Number",
    default: "10",
  },
  {
    name: "teleport-to",
    type: "String",
    default: "body",
  },
  {
    name: "teleport-disabled",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const events = [{ name: "click", type: "void" }];
const variables: IVariablesTableData[] = [];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphBacktop" name="backtop" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" />
  </div>
</template>
