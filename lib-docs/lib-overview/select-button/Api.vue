<script setup lang="ts">
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { enumToString } from "~/utils";
import type { IAttributesTableData, ISlotsTableData, IVariablesTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String",
    default: "-",
    required: true,
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
    name: "fill",
    type: "Boolean",
    default: "false",
  },
  {
    name: "options",
    type: `Array<INmorphSelectButtonOption>`,
    default: "[]",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const events = [{ name: "update:model-value", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphSelectButton"
      name="select-button"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
