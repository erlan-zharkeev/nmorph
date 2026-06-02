<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
  },
  {
    name: "items",
    type: "Array&lt;NmorphMediaGalleryItem&gt; (kind, src, name, size, downloadHref)",
    default: "[]",
    required: true,
  },
  {
    name: "initial-index",
    type: "Number",
    default: "0",
  },
  {
    name: "active-index",
    type: "Number",
    default: "undefined",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
  },
  {
    name: "show-trigger",
    type: "Boolean",
    default: "false",
  },
  {
    name: "show-trigger-name",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-trigger-size",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-trigger-actions",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-trigger-preview-action",
    type: "Boolean",
    default: "true",
    description:
      "Controls the preview/eye action inside trigger cards when show-trigger-actions is enabled.",
  },
  {
    name: "show-trigger-fullscreen-action",
    type: "Boolean",
    default: "true",
    description:
      "Controls the video fullscreen action inside trigger cards when show-trigger-actions is enabled.",
  },
  {
    name: "show-trigger-download-action",
    type: "Boolean",
    default: "true",
    description:
      "Controls the download action inside trigger cards when show-trigger-actions is enabled.",
  },
  {
    name: "show-trigger-play-button",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-navigation-buttons",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-action-bar",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-file-name",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-file-size",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-file-actions",
    type: "Boolean",
    default: "true",
  },
  {
    name: "show-playback-button",
    type: "Boolean",
    default: "true",
    description:
      "Compatibility prop. Expanded videos use native video controls; preview trigger play icons are controlled by show-trigger-play-button.",
  },
  {
    name: "image-fit",
    type: "'cover' | 'contain'",
    default: "contain",
  },
  {
    name: "video-fit",
    type: "'cover' | 'contain'",
    default: "contain",
  },
];

const events: IEventsTableData[] = [
  { name: "update:model-value", type: "Boolean" },
  { name: "update:active-index", type: "Number" },
  { name: "close", type: "void" },
  { name: "change", type: "NmorphMediaGalleryItem, Number" },
  { name: "download", type: "NmorphMediaGalleryItem, Number" },
  { name: "fullscreen", type: "NmorphMediaGalleryItem, Number" },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphMediaGallery"
      name="media-gallery"
      :attributes="attributesData"
      :events="events"
    />
  </div>
</template>
