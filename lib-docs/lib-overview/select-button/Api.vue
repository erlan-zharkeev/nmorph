<script setup lang="ts">
import {
  NmorphComponentThickness,
} from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { optionsToString } from "~/utils";
import type { IAttributesTableData, ISlotsTableData } from "~/types";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "thickness",
    type: optionsToString(NmorphComponentThickness),
    default: "basic",
  },
  {
    name: "custom-thickness",
    type: "Length",
    default: "-",
    description: "Overrides the selected thickness value.",
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
const events = [{ name: "update:model-value", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphSelectButton"
      name="select-button"
      :attributes="attributesData"
      :slots="slotData"
      :events="events"
    />
  </div>
</template>
