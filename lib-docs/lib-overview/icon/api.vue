<script setup lang="ts">
import { NmorphIconSize } from "@nmorph/nmorph-ui-kit";
import ApiTable from "~/components/api-table/api-table.vue";

const attributesData = [
  {
    name: "size",
    description: "Set native button type",
    type: Object.values(NmorphIconSize).join(", "),
    default: "small",
  },
  {
    name: "width",
    description: "Button text",
    type: "String(css value)",
    default: "-",
  },
  {
    name: "height",
    description: "Enable/Disable loader inside button",
    type: "String(css value)",
    default: "-",
  },
];
const slotData = [
  {
    name: "default",
    description: "Customize button content",
  },
];
</script>
<template>
  <div class="docs-api-table">
    <api-table name="Icon" :attributes="attributesData" :slots="slotData" />
  </div>
</template>
