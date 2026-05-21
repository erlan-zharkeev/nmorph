<script setup lang="ts">
import type {
  IAttributesTableData,
  ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  { name: "tag", type: "String", default: "section", description: "Root HTML tag or component." },
  { name: "gap", type: "Number | String", default: "0", description: "Gap between layout regions." },
  { name: "aside-width", type: "Number | String", default: "240px", description: "Width of the aside region." },
  { name: "aside-position", type: "'left' | 'right'", default: "left", description: "Side where the aside slot is rendered." },
  { name: "full-height", type: "Boolean", default: "false", description: "Makes the root fill the available height." },
];

const slotData: ISlotsTableData[] = [
  { name: "default", description: "Main content region." },
  { name: "header", description: "Header region." },
  { name: "aside", description: "Aside region." },
  { name: "footer", description: "Footer region." },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphLayout" name="layout" :attributes="attributesData" :slots="slotData" />
  </div>
</template>
