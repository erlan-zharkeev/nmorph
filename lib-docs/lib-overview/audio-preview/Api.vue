<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
  type IExposesTableData,
  type ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "src",
    type: "String",
    default: "-",
    required: true,
  },
  {
    name: "name",
    type: "String",
    default: "-",
  },
  {
    name: "duration-ms",
    type: "Number",
    default: "undefined",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
  },
  {
    name: "surface",
    type: "'card' | 'soft' | 'plain'",
    default: "card",
  },
  {
    name: "embedded",
    type: "Boolean",
    default: "false",
  },
  {
    name: "show-icon",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-header",
    type: "Boolean",
    default: "true",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
  },
  {
    name: "preload",
    type: "'none' | 'metadata' | 'auto'",
    default: "metadata",
  },
  {
    name: "download-href",
    type: "String",
    default: "-",
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
  { name: "play", type: "Event" },
  { name: "pause", type: "Event" },
  { name: "open", type: "void" },
  { name: "download", type: "void" },
  { name: "error", type: "Event" },
];
const exposes: IExposesTableData[] = [
  {
    name: "audioRef",
    type: `${docsLink(
      "HTMLAudioElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLAudioElement",
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphAudioPreview"
      name="audio-preview"
      :attributes="attributesData"
      :slots="slots"
      :exposes="exposes"
      :events="events"
    />
  </div>
</template>
