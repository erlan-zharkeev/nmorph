<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphNotificationPlacement } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "notifications",
    type: `Array<INmorphNotification & { width?: string; duration?: number; showDurationValue?: boolean; placement?: ${enumToString(NmorphNotificationPlacement)}; }>`,
    default: "-",
    required: true,
    description:
      "Notification items extend NmorphAlert props. duration > 0 shows the dismiss indicator and auto-closes; pass showDurationValue: false to keep only the progress bar.",
  },
  {
    name: "placement",
    type: enumToString(NmorphNotificationPlacement),
    default: "top-right",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
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
    <api-table title="NmorphProvider" name="notification-provider" :attributes="attributesData" :slots="slotData"
      :variables="variables" />
  </div>
</template>
