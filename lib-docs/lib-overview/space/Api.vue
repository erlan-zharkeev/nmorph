<script setup lang="ts">
import type {
  IAttributesTableData,
  ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  { name: "tag", type: "String", default: "div", description: "Root HTML tag or component." },
  { name: "direction", type: "'row' | 'column'", default: "row", description: "Flex direction." },
  { name: "size", type: "'small' | 'medium' | 'large' | Number | String", default: "medium", description: "Gap size." },
  { name: "align", type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", default: "start", description: "Flex align-items value." },
  { name: "justify", type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'", default: "start", description: "Flex justify-content value." },
  { name: "wrap", type: "Boolean", default: "false", description: "Enables flex wrapping." },
  { name: "inline", type: "Boolean", default: "false", description: "Uses inline-flex display." },
  { name: "fill", type: "Boolean", default: "false", description: "Makes the space fill available width." },
];

const slotData: ISlotsTableData[] = [{ name: "default", description: "Space items." }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphSpace" name="space" :attributes="attributesData" :slots="slotData" />
  </div>
</template>
