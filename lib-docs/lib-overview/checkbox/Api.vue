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
    name: "id",
    type: "String",
    default: "-",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "design",
    type: "'button' | 'checkbox'",
    default: "checkbox",
  },
];

const slotData: ISlotsTableData[] = [{ name: "default" }, { name: "label" }];
const variables: IVariablesTableData[] = [{ name: "size" }];
const events = [{ name: "update:model-value", type: "Boolean" }];
const exposes = [
  {
    name: "inputDOMRef",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphCheckbox" name="checkbox" :attributes="attributesData" :slots="slotData"
      :variables="variables" :exposes="exposes" :events="events" />
  </div>
</template>
