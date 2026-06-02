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
    name: "media-preview",
    type: "'none' | 'audio' | 'video' | 'image'",
    default: "none",
  },
  {
    name: "preview-mode",
    type: "'internal' | 'emit' | 'none'",
    default: "internal",
  },
  {
    name: "surface",
    type: "'card' | 'soft' | 'plain'",
    default: "card",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
  },
  {
    name: "show-name",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-meta",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-size",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-extension-badge",
    type: "Boolean",
    default: "true",
  },
  {
    name: "icon-surface",
    type: "Boolean",
    default: "true",
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
  {
    name: "show-playback-button",
    type: "Boolean",
    default: "true",
  },
];

const slots: ISlotsTableData[] = [
  {
    name: "actions",
    description:
      "Replaces the default action controls. Custom actions render in the same top-right action area for visual, compact, and regular file cards and receive fileName, previewSrc, downloadHref, open, and download slot props.",
  },
];
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
