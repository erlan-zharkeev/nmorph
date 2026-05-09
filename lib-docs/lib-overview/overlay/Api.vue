<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "show",
    type: "Boolean",
    default: "-",
    required: true,
  },
  {
    name: "transparent",
    type: "Boolean",
    default: "false",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "teleport-to",
    type: "String | HTMLElement",
    default: "body",
  },
  {
    name: "disabled-teleport",
    type: "Boolean",
    default: "false",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const events = [{ name: "on-outside-click", type: "void" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphOverlay"
      name="overlay"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
