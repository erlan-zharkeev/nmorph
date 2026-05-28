<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "name",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "extension",
    type: "String",
    default: "-",
  },
  {
    name: "mime-type",
    type: "String",
    default: "-",
  },
  {
    name: "size",
    type: "Number",
    default: "undefined",
  },
  {
    name: "preview-src",
    type: "String",
    default: "-",
  },
  {
    name: "download-href",
    type: "String",
    default: "-",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "error",
    type: "Boolean",
    default: "false",
  },
  {
    name: "error-text",
    type: "String",
    default: "-",
  },
  {
    name: "show-default-actions",
    type: "Boolean",
    default: "true",
  },
];

const slots: ISlotsTableData[] = [{ name: "actions" }];
const events: IEventsTableData[] = [
  { name: "open", type: "void" },
  { name: "download", type: "void" },
  { name: "error", type: "void" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphFileCard"
      name="file-card"
      :attributes="attributesData"
      :slots="slots"
      :events="events"
    />
  </div>
</template>
