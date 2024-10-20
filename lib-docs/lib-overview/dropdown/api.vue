
<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [{
  name: "open",
  type: "",
  default: "",
},{
  name: "relative-element",
  type: "",
  default: "",
},{
  name: "width",
  type: "",
  default: "",
},{
  name: "x-offset",
  type: "",
  default: "",
},{
  name: "y-offset",
  type: "",
  default: "",
},{
  name: "fill-width",
  type: "",
  default: "",
}];

const slotData: ISlotsTableData[] = [];

const variables: IVariablesTableData[] = [];
</script>

<template>
<div class="docs-api-table">
  <api-table
    title="dropdown"
    name="dropdown"
    :attributes="attributesData"
    :slots="slotData"
    :variables="variables"
  />
</div>
</template>
