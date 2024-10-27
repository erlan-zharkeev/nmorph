<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import {
  NmorphComponentDirection,
  NmorphComponentHeight,
} from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "fill",
    type: "Boolean",
    default: "true",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "Array&lt;String&gt;",
    default: "-",
    required: true,
  },
  {
    name: "options",
    type: `Array<${docsLink(
      "INmorphCheckboxOption",
      "/components/checkbox#content-attributes"
    )}>`,
    default: "[]",
  },
  {
    name: "design",
    type: "button | checkbox",
    default: "checkbox",
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
      title="checkbox-group"
      name="checkbox-group"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :events="events"
    />
  </div>
</template>
