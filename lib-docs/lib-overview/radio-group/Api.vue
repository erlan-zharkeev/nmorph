<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

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
    default: "thin",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "options",
    type: `Array<${docsLink(
      "INmorphRadioOption",
      "/components/radio#content-attributes"
    )}>`,
    default: "[]",
  },
  {
    name: "style-type",
    type: "button | radio-style",
    default: "radio-style",
  },
  {
    name: "direction",
    type: "row | column",
    default: "row",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const events = [{ name: "update:model-value", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphRadioGroup" name="radio-group" :attributes="attributesData" :slots="slotData"
      :variables="variables" :events="events" />
  </div>
</template>
