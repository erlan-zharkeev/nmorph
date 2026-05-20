<script setup lang="ts">
import {
  type IAttributesTableData,
  type ISlotsTableData,
  type IVariablesTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { resolution } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: `Array<{ data: ${docsLink(
      "File",
      "https://developer.mozilla.org/ru/docs/Web/API/File"
    )}, previewUrl: String }>`,
    default: "",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "multiple",
    type: "Boolean",
    default: "false",
  },
  {
    name: "allowed-types",
    type: `${enumToString(resolution)} | String`,
    default: "all files",
  },
  {
    name: "photo-with-preview",
    type: "Boolean",
    default: "true",
  },
  {
    name: "fill",
    type: "Boolean",
    default: "true",
  },
];

const slotData: ISlotsTableData[] = [{ name: "trigger" }];
const variables: IVariablesTableData[] = [];
const exposes = [
  {
    name: "inputDOMRef",
    type: `${docsLink(
      "HTMLElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLElement"
    )} | null`,
  },
];
const events = [
  { name: "on-unsupported-file-type-error", type: "String" },
  {
    name: "update:model-value",
    type: `Array<{ data: ${docsLink(
      "File",
      "https://developer.mozilla.org/ru/docs/Web/API/File"
    )}, previewUrl: String }>`,
  },
];

const translates = [{ name: 'selectFile' }]
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphFileUpload" name="file-upload" :attributes="attributesData" :slots="slotData"
      :variables="variables" :exposes="exposes" :events="events" :translates="translates" />
  </div>
</template>
