<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentThickness } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Array<String>",
    default: "-",
    required: true,
  },
  {
    name: "accordion",
    type: "Boolean",
    default: "false",
  },
];

const events: IEventsTableData[] = [
  {
    name: "update:model-value",
    type: "Array<String>",
  },
];

const itemAttributesData: IAttributesTableData[] = [
  {
    name: "name",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "title",
    type: "String",
    default: "-",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "block",
    type: "Boolean",
    default: "false",
  },
  {
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
    default: "basic",
  },
  {
    name: "transition-speed",
    type: "Transition-duration",
    default: "undefined",
  },
];

const slots: ISlotsTableData[] = [
  {
    name: "default",
  },
  {
    name: "title",
  },
];
const itemVariables: IVariablesTableData[] = [{ name: "transition-speed" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphCollapse" name="collapse" :attributes="attributesData" :events="events" />
  </div>
  <div class="docs-api-table">
    <api-table
      title="NmorphCollapseItem"
      name="collapse-item"
      :attributes="itemAttributesData"
      :slots="slots"
      :variables="itemVariables"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
