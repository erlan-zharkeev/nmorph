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
    description: "Audio source URL.",
  },
  {
    name: "name",
    type: "String",
    default: "-",
    description: "File name shown in the preview header.",
  },
  {
    name: "duration-ms",
    type: "Number",
    default: "undefined",
    description: "Optional duration displayed near the file name.",
  },
  {
    name: "width",
    type: "Width",
    default: "undefined",
    description: "Preview width.",
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
    name: "show-icon",
    type: "Boolean",
    default: "true",
    description: "Shows the audio file icon.",
  },
  {
    name: "show-header",
    type: "Boolean",
    default: "true",
    description: "Shows the name and duration header.",
  },
  {
    name: "compact",
    type: "Boolean",
    default: "false",
    description: "Uses a denser preview layout.",
  },
  {
    name: "preload",
    type: "'none' | 'metadata' | 'auto'",
    default: "metadata",
    description: "Native audio preload mode.",
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
];

const slots: ISlotsTableData[] = [
  { name: "actions", description: "Replaces the default action buttons." },
];
const events: IEventsTableData[] = [
  { name: "play", type: "Event", description: "Emitted when playback starts." },
  { name: "pause", type: "Event", description: "Emitted when playback pauses." },
  { name: "open", type: "void", description: "Emitted when the open action is clicked." },
  { name: "download", type: "void", description: "Emitted when the download action is clicked." },
  { name: "error", type: "Event", description: "Emitted when the native audio element errors." },
];
const exposes: IExposesTableData[] = [
  {
    name: "audioRef",
    type: `${docsLink(
      "HTMLAudioElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLAudioElement",
    )} | null`,
    description: "Native audio element reference.",
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
