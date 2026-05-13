<script setup lang="ts">
import ApiTable from "~/components/api-table/ApiTable.vue";
import type { IAttributesTableData, ISlotsTableData, IVariablesTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "type",
    type: "'info' | 'warning' | 'success' | 'error'",
    default: "info",
  },
  {
    name: "title",
    type: "String",
    default: "''",
  },
  {
    name: "content",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "color",
    type: "String",
    default: "undefined",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [{ name: "callout-color" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphCallout"
      name="callout"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
