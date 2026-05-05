<script setup lang="ts">
import {
  type IAttributesTableData,
  type IExposesTableData,
  type IEventsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphComponentHeight } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "id",
    type: "String",
    default: "generated",
  },
  {
    name: "name",
    type: "String",
    default: "id",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "model-value",
    type: "String",
    default: "theme accent",
  },
  {
    name: "show-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "display-format",
    type: "'hex' | 'rgb' | 'hsl'",
    default: "hex",
  },
];

const events: IEventsTableData[] = [
  { name: "update:model-value", type: "String" },
  { name: "focus", type: "void" },
  { name: "blur", type: "void" },
];

const exposes: IExposesTableData[] = [
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
    <api-table title="NmorphColorPicker" name="color-picker" :attributes="attributesData" :events="events"
      :exposes="exposes" />
  </div>
</template>
