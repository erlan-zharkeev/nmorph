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
    description: "Video source URL.",
  },
  {
    name: "poster",
    type: "String",
    default: "-",
    description: "Poster image shown before playback.",
  },
  {
    name: "name",
    type: "String",
    default: "-",
    description: "File name shown in the preview metadata.",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
    description: "Preview width.",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
    description: "Preview height.",
  },
  {
    name: "preview-width",
    type: "Width",
    default: "undefined",
    description: "Internal preview modal content width.",
  },
  {
    name: "preview-height",
    type: "Height",
    default: "undefined",
    description: "Internal preview modal content height.",
  },
  {
    name: "duration-ms",
    type: "Number",
    default: "undefined",
    description: "Optional duration displayed in the preview metadata.",
  },
  {
    name: "surface",
    type: "'card' | 'soft' | 'plain'",
    default: "card",
    description: "Preview surface style.",
  },
  {
    name: "embedded",
    type: "Boolean",
    default: "false",
    description: "Removes the outer surface for embedding in another card.",
  },
  {
    name: "show-meta",
    type: "Boolean",
    default: "true",
    description: "Shows file name and duration metadata.",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
    description: "Uses a denser preview size.",
  },
  {
    name: "controls",
    type: "Boolean",
    default: "true",
    description: "Shows native video controls.",
  },
  {
    name: "muted",
    type: "Boolean",
    default: "false",
    description: "Mutes the native video element.",
  },
  {
    name: "playsinline",
    type: "Boolean",
    default: "true",
    description: "Enables inline playback on mobile browsers.",
  },
  {
    name: "preload",
    type: "'none' | 'metadata' | 'auto'",
    default: "metadata",
    description: "Native video preload mode.",
  },
  {
    name: "fit",
    type: "'cover' | 'contain'",
    default: "cover",
    description: "Object fit used by the video.",
  },
  {
    name: "download-href",
    type: "String",
    default: "-",
    description: "Download URL. Falls back to src when omitted.",
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
    description: "Error message displayed in the preview.",
  },
  {
    name: "show-playback-button",
    type: "Boolean",
    default: "true",
    description: "Shows the custom play and pause button.",
  },
  {
    name: "show-default-actions",
    type: "Boolean",
    default: "true",
    description: "Shows built-in open and download actions.",
  },
  {
    name: "show-preview-action",
    type: "Boolean",
    default: "true",
    description: "Shows the preview overlay action.",
  },
  {
    name: "show-fullscreen-action",
    type: "Boolean",
    default: "true",
    description: "Shows the fullscreen action when native controls are hidden.",
  },
  {
    name: "preview-mode",
    type: "'internal' | 'emit'",
    default: "internal",
    description: "Chooses whether preview opens internally or only emits an event.",
  },
];

const slots: ISlotsTableData[] = [
  { name: "actions", description: "Replaces the default action buttons." },
];
const events: IEventsTableData[] = [
  { name: "play", type: "Event", description: "Emitted when playback starts." },
  { name: "pause", type: "Event", description: "Emitted when playback pauses." },
  { name: "open", type: "void", description: "Emitted when the open action is clicked." },
  { name: "preview", type: "void", description: "Emitted when the preview action is clicked." },
  {
    name: "fullscreen",
    type: "void",
    description: "Emitted when the fullscreen action is clicked.",
  },
  { name: "download", type: "void", description: "Emitted when the download action is clicked." },
  { name: "error", type: "Event", description: "Emitted when the native video element errors." },
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
