<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "Number | String",
    default: "-",
  },
  {
    name: "max",
    type: "Number",
    default: "99",
  },
  {
    name: "is-dot",
    type: "Boolean",
    default: "false",
  },
  {
    name: "hidden",
    type: "Boolean",
    default: "false",
  },
  {
    name: "color",
    type: "String",
    default: "var(--nmorph-accent-color)",
  },
  {
    name: "offset-y",
    type: "Number",
    default: "0",
  },
  {
    name: "offset-x",
    type: "Number",
    default: "0",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];

const variables: IVariablesTableData[] = [];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      name="badge"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
