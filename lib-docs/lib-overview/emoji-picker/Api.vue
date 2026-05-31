<script setup lang="ts">
import { type IAttributesTableData, type IEventsTableData } from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "language",
    type: "String",
    default: "en",
    description: "Locale used for text normalization. Host apps can pass their own data or lazy-load package locales.",
  },
  {
    name: "data-source",
    type: "NmorphEmojiPickerDataSource",
    default: "[]",
    description: "Already loaded emoji data. Use your own dataset or @nmorph/nmorph-ui-kit/emoji locale helpers.",
  },
  {
    name: "i18n",
    type: "INmorphEmojiPickerI18n",
    default: "{}",
    description: "Localized labels and category names for the selected language.",
  },
  {
    name: "quick-list",
    type: "String[]",
    default: "[]",
    description: "Host-provided frequent emoji list. The UI-kit does not store usage stats.",
  },
  {
    name: "initial-expanded",
    type: "Boolean",
    default: "true",
  },
  {
    name: "width",
    type: "Width",
    default: "300px",
  },
  {
    name: "height",
    type: "Height",
    default: "260px",
  },
  {
    name: "columns",
    type: "Number",
    default: "8",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: "false",
  },
  {
    name: "hide-shadow",
    type: "Boolean",
    default: "false",
  },
];

const events: IEventsTableData[] = [
  { name: "select", type: "String" },
  { name: "expand", type: "void" },
  { name: "collapse", type: "void" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table title="NmorphEmojiPicker" name="emoji-picker" :attributes="attributesData" :events="events" />
  </div>
</template>
