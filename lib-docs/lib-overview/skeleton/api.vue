
<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData: IAttributesTableData[] = [{
  name: "animated",
  type: "",
  default: "",
},{
  name: "loading",
  type: "",
  default: "",
},{
  name: "rows",
  type: "",
  default: "",
}];

const slotData: ISlotsTableData[] = [];

const variables: IVariablesTableData[] = [];
</script>

<template>
<div class="docs-api-table">
  <api-table
    name="skeleton"
    :attributes="attributesData"
    :slots="slotData"
    :variables="variables"
  />
</div>
</template>
