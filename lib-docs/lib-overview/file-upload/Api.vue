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
    name: "id",
    type: "String",
    default: "NmorphFormItem id or generated id",
    description:
      "Sets the native input id. Inherits NmorphFormItem id when used inside a form item",
  },
  {
    name: "name",
    type: "String",
    default: "id",
    description:
      "Sets the native input name. Inherits NmorphFormItem name or id when omitted",
  },
  {
    name: "autocomplete",
    type: "String",
    default: "-",
    description:
      "Autocomplete value passed to the native file input. Can also be inherited from NmorphFormItem",
  },
  {
    name: "tabindex",
    type: "Number | String",
    default: "0",
    description: "Sets tabindex for the native file input",
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
    name: "on-file-validation-error",
    type: `{ file: ${docsLink(
      "File",
      "https://developer.mozilla.org/ru/docs/Web/API/File"
    )}; errors: String[] }`,
    description:
      "Event triggered when NmorphForm rules reject a selected file before it is accepted",
  },
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
