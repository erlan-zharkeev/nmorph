<script setup lang="ts">
import { type IAttributesTableData, type IEventsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Array&lt;NmorphTagItem&gt;",
    default: "-",
    required: true,
  },
  {
    name: "selected-value",
    type: "String | null",
    default: "null",
    description:
      "Selected tag value for v-model:selected-value. Updated when a tag is clicked.",
  },
  {
    name: "design",
    type: "nmorph, common",
    default: "nmorph",
  },
  {
    name: "color",
    type: "String",
    default: "var(--nmorph-gray-color)",
    description:
      "Background color for common design tags. Individual tag items can override it with their own color.",
  },
];

const events: IEventsTableData[] = [
  {
    name: "click",
    type: "String",
  },
  {
    name: "close",
    type: "String",
  },
  {
    name: "update:model-value",
    type: "Array&lt;NmorphTagItem&gt;",
  },
  {
    name: "update:selected-value",
    type: "String",
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTagList"
      name="tag-list"
      :attributes="attributesData"
      :events="events"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
