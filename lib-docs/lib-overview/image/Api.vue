<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "src",
    type: "String | undefined",
    default: "undefined",
  },
  {
    name: "src-set",
    type: "String",
    default: "-",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
    description: "Root image width.",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
    description: "Root image height.",
  },
  {
    name: "fit",
    type: docsLink(
      "Object-fit",
      "https://developer.mozilla.org/ru/docs/Web/CSS/object-fit"
    ),
    default: "cover",
  },
  {
    name: "alt",
    type: "String",
    default: "-",
  },
  {
    name: "load-failed-text",
    type: "String",
    default: "-",
  },
];

const slotData: ISlotsTableData[] = [{ name: "loading" }, { name: "error" }];

const variables: IVariablesTableData[] = [
  { name: "width" },
  { name: "height" },
  { name: "background-color" },
];

const events = [
  {
    name: "error",
    type: docsLink(
      "Event",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
    ),
  },
  {
    name: "load",
    type: docsLink(
      "Event",
      "https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event"
    ),
  },
];
const translates = [{ name: "loadFailedText" }];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphImage" name="image" :attributes="attributesData" :slots="slotData" :variables="variables"
      :events="events" :translates="translates" />
  </div>
</template>
