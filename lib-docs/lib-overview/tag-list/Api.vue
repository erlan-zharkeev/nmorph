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
];

const events: IEventsTableData[] = [
  {
    name: "close",
    type: "String",
  },
  {
    name: "update:model-value",
    type: "Array&lt;NmorphTagItem&gt;",
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
