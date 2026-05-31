<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
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
    name: "poster",
    type: "String",
    default: "-",
  },
  {
    name: "name",
    type: "String",
    default: "-",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
  },
  {
    name: "duration-ms",
    type: "Number",
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
    name: "show-meta",
    type: "Boolean",
    default: "true",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
  },
  {
    name: "controls",
    type: "Boolean",
    default: "true",
  },
  {
    name: "muted",
    type: "Boolean",
    default: "false",
  },
  {
    name: "playsinline",
    type: "Boolean",
    default: "true",
  },
  {
    name: "preload",
    type: "'none' | 'metadata' | 'auto'",
    default: "metadata",
  },
  {
    name: "fit",
    type: "'cover' | 'contain'",
    default: "cover",
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
  {
    name: "show-preview-action",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-fullscreen-action",
    type: "Boolean",
    default: "true",
  },
];

const slots: ISlotsTableData[] = [{ name: "actions" }];
const events: IEventsTableData[] = [
  { name: "play", type: "Event" },
  { name: "pause", type: "Event" },
  { name: "open", type: "void" },
  { name: "preview", type: "void" },
  { name: "fullscreen", type: "void" },
  { name: "download", type: "void" },
  { name: "error", type: "Event" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphVideoPreview"
      name="video-preview"
      :attributes="attributesData"
      :slots="slots"
      :events="events"
    />
  </div>
</template>
