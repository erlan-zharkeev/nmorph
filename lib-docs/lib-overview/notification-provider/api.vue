<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphNotificationPlacement } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "notifications",
    type: `Array<${docsLink(
      "Alert",
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date"
    )} & ${docsLink(
      "Width",
      "https://developer.mozilla.org/ru/docs/Web/CSS/width"
    )} & duration?: number;>[]`,
    default: "-",
    required: true,
  },
  {
    name: "placement",
    type: enumToString(NmorphNotificationPlacement),
    default: "top-right",
  },
  {
    name: "z-index",
    type: "Number",
    default: "1000",
  },
  {
    name: "quantity",
    type: "Number",
    default: "100",
  },
];

const slotData: ISlotsTableData[] = [];
const variables: IVariablesTableData[] = [];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphProvider"
      name="notification-provider"
      :attributes="attributesData"
      :slots="slotData"
      :variables="variables"
    />
  </div>
</template>
