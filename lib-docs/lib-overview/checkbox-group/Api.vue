<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphComponentDirection,
  NmorphSelectionControlHeight,
} from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Array&lt;String&gt;",
    default: "-",
    required: true,
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "height",
    type: enumToString(NmorphSelectionControlHeight),
    default: "thin",
  },
  {
    name: "options",
    type: `Array<${docsLink(
      "INmorphCheckboxOption",
      "/elements/checkbox#content-attributes",
      "_self",
    )}>`,
    default: "[]",
  },
  {
    name: "design",
    type: "button | checkbox",
    default: "button",
  },
  {
    name: "direction",
    type: enumToString(NmorphComponentDirection),
    default: "row",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }];
const variables: IVariablesTableData[] = [];
const events = [{ name: "update:model-value", type: "Array&lt;String&gt;" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphCheckboxGroup"
      name="checkbox-group"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
