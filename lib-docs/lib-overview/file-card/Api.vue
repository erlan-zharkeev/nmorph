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
    description: "File name displayed in the card.",
  },
  {
    name: "extension",
    type: "String",
    default: "-",
    description: "File extension shown in the badge and metadata.",
  },
  {
    name: "mime-type",
    type: "String",
    default: "-",
    description: "MIME type used to resolve the file kind.",
  },
  {
    name: "size",
    type: "Number",
    default: "undefined",
    description: "File size in bytes.",
  },
  {
    name: "preview-src",
    type: "String",
    default: "-",
    description: "Preview media source for image, audio, or video cards.",
  },
  {
    name: "download-href",
    type: "String",
    default: "-",
    description: "Download URL. Falls back to preview-src when omitted.",
  },
  {
    name: "media-preview",
    type: "'none' | 'audio' | 'video' | 'image'",
    default: "none",
    description: "Media preview mode rendered inside the card.",
  },
  {
    name: "preview-mode",
    type: "'internal' | 'emit' | 'none'",
    default: "internal",
    description: "Chooses internal preview, event-only preview, or no preview.",
  },
  {
    name: "surface",
    type: "'card' | 'soft' | 'plain'",
    default: "card",
    description: "Card surface style.",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
    description: "Card height.",
  },
  {
    name: "show-name",
    type: "Boolean",
    default: "true",
    description: "Shows the file name.",
  },
  {
    name: "show-meta",
    type: "Boolean",
    default: "true",
    description: "Shows file metadata.",
  },
  {
    name: "show-size",
    type: "Boolean",
    default: "true",
    description: "Shows the formatted file size.",
  },
  {
    name: "show-extension-badge",
    type: "Boolean",
    default: "true",
    description: "Shows the extension badge.",
  },
  {
    name: "icon-surface",
    type: "Boolean",
    default: "true",
    description: "Shows the icon background surface.",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
    description: "Uses the compact card layout.",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
    description: "Shows the loading state.",
  },
  {
    name: "error",
    type: "Boolean",
    default: "false",
    description: "Shows the error state.",
  },
  {
    name: "error-text",
    type: "String",
    default: "-",
    description: "Error message displayed in the card.",
  },
  {
    name: "show-default-actions",
    type: "Boolean",
    default: "true",
    description: "Shows built-in open and download actions.",
  },
  {
    name: "show-playback-button",
    type: "Boolean",
    default: "true",
    description: "Shows playback controls for audio and video previews.",
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
  { name: "open", type: "void", description: "Emitted when the open action is clicked." },
  {
    name: "download",
    type: "void",
    description: "Emitted when the download action is clicked.",
  },
  { name: "error", type: "void", description: "Emitted when media preview loading fails." },
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
