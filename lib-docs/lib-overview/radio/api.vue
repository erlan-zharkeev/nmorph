<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphRadioStyleType } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "label",
    type: "String",
    default: "-",
  },
  {
    name: "style-type",
    type: enumToString(NmorphRadioStyleType),
    default: "button",
  },
];
const slotData: ISlotsTableData[] = [{ name: "label" }];
const variables: IVariablesTableData[] = [{ name: "size" }];
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
    <api-table
      title="NmorphRadio"
      name="radio"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
      :exposes="exposes"
    />
  </div>
</template>
