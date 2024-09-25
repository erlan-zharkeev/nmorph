<script setup lang="ts">
import { type IAttributesTableData } from "~/types";
import ApiTable from "~/components/api-table/api-table.vue";
import { NmorphComponentHeight, NmorphDivider } from "@nmorph/nmorph-ui-kit";

const listAttributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "String",
    default: "-",
    required: true,
  },
];

const listEvents = [
  {
    name: "close",
    type: docsLink(
      "Array&lt;NmorphTagItem&gt;",
      "#content-tag-item-attributes",
      "_self"
    ),
  },
  {
    name: "update:model-value",
    type: docsLink(
      "Array&lt;NmorphTagItem&gt;",
      "#content-tag-item-attributes",
      "_self"
    ),
  },
];

const attributesData: IAttributesTableData[] = [
  {
    name: "value",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "text",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "removable",
    type: "Boolean",
    default: "true",
  },
  {
    name: "height",
    type: enumToString(NmorphComponentHeight),
    default: "default",
  },
  {
    name: "design",
    type: "nmorph, common",
    default: "nmorph",
  },
];

const events = [{ name: "close", type: "String" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphTagList"
      name="tag-list"
      :attributes="listAttributesData"
      :events="listEvents"
      additional-id="tag-list"
    />
  </div>
  <NmorphDivider />
  <div class="docs-api-table">
    <api-table
      title="NmorphTagItem"
      name="tag-item"
      :attributes="attributesData"
      :events="events"
      additional-id="tag-item"
    />
  </div>
</template>

<style scoped>
.docs-api-table {
  margin: 16px 0;
}
</style>
