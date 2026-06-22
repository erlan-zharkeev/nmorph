<script setup lang="ts">
import {
  type IAttributesTableData,
  type IEventsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";
import { NmorphElementDesign } from "@nmorph/nmorph-ui-kit";

const attributesData: IAttributesTableData[] = [
  {
    name: "model-value",
    type: "Boolean",
    default: "false",
    description: "Controls whether the preview overlay is open.",
  },
  {
    name: "design",
    type: optionsToString(NmorphElementDesign),
    default: "nmorph",
    description: "Visual surface design used by trigger cards.",
  },
  {
    name: "items",
    type: "Array&lt;NmorphMediaGalleryItem&gt; (kind, src, name, size, downloadHref, aspectRatio, itemClass, itemStyle)",
    default: "[]",
    required: true,
    description:
      "Media items rendered by the gallery. Trigger cards can read aspectRatio, itemClass, and itemStyle from each item.",
  },
  {
    name: "initial-index",
    type: "Number",
    default: "0",
    description: "Item index opened first in uncontrolled mode.",
  },
  {
    name: "active-index",
    type: "Number",
    default: "undefined",
    description: "Controlled active item index.",
  },
  {
    name: "z-index",
    type: "Number",
    default: "auto",
    description: "Overlay z-index.",
  },
  {
    name: "height",
    type: "Height",
    default: "undefined",
    description: "Trigger card height.",
  },
  {
    name: "preview-width",
    type: "Width",
    default: "undefined",
    description: "Preview portal content width.",
  },
  {
    name: "preview-height",
    type: "Height",
    default: "undefined",
    description: "Preview portal content height.",
  },
  {
    name: "show-trigger",
    type: "Boolean",
    default: "false",
    description: "Renders trigger cards for the gallery items.",
  },
  {
    name: "show-trigger-name",
    type: "Boolean",
    default: "true",
    description: "Shows item names inside trigger cards.",
  },
  {
    name: "show-trigger-size",
    type: "Boolean",
    default: "true",
    description: "Shows item sizes inside trigger cards.",
  },
  {
    name: "show-trigger-actions",
    type: "Boolean",
    default: "true",
    description: "Shows action buttons inside trigger cards.",
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
    description: "Shows the play button overlay for video trigger cards.",
  },
  {
    name: "trigger-layout",
    type: "'grid' | 'natural' | 'mosaic'",
    default: "grid",
    description:
      "Controls trigger card layout. natural and mosaic derive item widths from item.aspectRatio.",
  },
  {
    name: "trigger-class",
    type: "string | string[] | Record&lt;string, boolean&gt;",
    default: "undefined",
    description: "Additional class applied to the trigger container.",
  },
  {
    name: "trigger-style",
    type: "CSSProperties",
    default: "undefined",
    description: "Additional inline styles applied to the trigger container.",
  },
  {
    name: "trigger-image-fit",
    type: "'cover' | 'contain'",
    default: "cover",
    description: "Object fit used for image thumbnails in trigger cards.",
  },
  {
    name: "trigger-video-fit",
    type: "'cover' | 'contain'",
    default: "cover",
    description: "Object fit used for video thumbnails in trigger cards.",
  },
  {
    name: "trigger-item-class",
    type: "(item, index) =&gt; string | string[] | Record&lt;string, boolean&gt;",
    default: "undefined",
    description: "Returns additional classes for a trigger item.",
  },
  {
    name: "trigger-item-style",
    type: "(item, index) =&gt; CSSProperties",
    default: "undefined",
    description:
      "Returns additional inline styles for a trigger item. item.aspectRatio is applied as CSS aspect-ratio and drives natural/mosaic layout sizing.",
  },
  {
    name: "show-navigation-buttons",
    type: "Boolean",
    default: "true",
    description: "Shows previous and next buttons in the preview overlay.",
  },
  {
    name: "show-action-bar",
    type: "Boolean",
    default: "true",
    description: "Shows the preview overlay action bar.",
  },
  {
    name: "show-file-name",
    type: "Boolean",
    default: "true",
    description: "Shows the current file name in the preview overlay.",
  },
  {
    name: "show-file-size",
    type: "Boolean",
    default: "true",
    description: "Shows the current file size in the preview overlay.",
  },
  {
    name: "show-file-actions",
    type: "Boolean",
    default: "true",
    description: "Shows file actions in the preview overlay.",
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
    description: "Object fit used for image previews.",
  },
  {
    name: "video-fit",
    type: "'cover' | 'contain'",
    default: "contain",
    description: "Object fit used for video previews.",
  },
];

const events: IEventsTableData[] = [
  {
    name: "update:model-value",
    type: "Boolean",
    description: "Emitted when overlay visibility changes.",
  },
  {
    name: "update:active-index",
    type: "Number",
    description: "Emitted when the active item index changes.",
  },
  { name: "close", type: "void", description: "Emitted when the preview overlay closes." },
  {
    name: "change",
    type: "NmorphMediaGalleryItem, Number",
    description: "Emitted after the active item changes.",
  },
  {
    name: "download",
    type: "NmorphMediaGalleryItem, Number",
    description: "Emitted when an item download action is clicked.",
  },
  {
    name: "fullscreen",
    type: "NmorphMediaGalleryItem, Number",
    description: "Emitted when an item fullscreen action is clicked.",
  },
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
