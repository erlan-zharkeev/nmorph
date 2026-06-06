<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import {
  NmorphComponentDirection,
  NmorphElementDesign,
  NmorphSelectionControlThickness,
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
    name: "thickness",
    type: optionsToString(NmorphSelectionControlThickness),
    default: "thin",
  },
  {
    name: "options",
    type: `Array<${docsLink(
      "INmorphCheckboxGroupOption",
      "/elements/checkbox-group#content-attributes",
      "_self",
    )}>`,
    default: "[]",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
  },
  {
    name: "direction",
    type: optionsToString(NmorphComponentDirection),
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
