<script setup lang="ts">
import {
  type IAttributesTableData,
  type IExposesTableData,
  type ISlotsTableData,
} from "~/types";
import ApiTable from "~/components/api-table/ApiTable.vue";

const attributesData: IAttributesTableData[] = [
  {
    name: "src",
    type: "String",
    default: "-",
  },
  {
    name: "src-object",
    type: "MediaStream | null",
    default: "null",
  },
  {
    name: "fit",
    type: "'cover' | 'contain'",
    default: "cover",
  },
  {
    name: "mirrored",
    type: "Boolean",
    default: "false",
  },
  {
    name: "muted",
    type: "Boolean",
    default: "true",
  },
  {
    name: "autoplay",
    type: "Boolean",
    default: "true",
  },
  {
    name: "playsinline",
    type: "Boolean",
    default: "true",
  },
  {
    name: "name",
    type: "String",
    default: "-",
  },
  {
    name: "avatar-src",
    type: "String",
    default: "-",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
  },
  {
    name: "mic-muted",
    type: "Boolean",
    default: "false",
  },
  {
    name: "video-off",
    type: "Boolean",
    default: "false",
  },
  {
    name: "screen-sharing",
    type: "Boolean",
    default: "false",
  },
  {
    name: "speaking",
    type: "Boolean",
    default: "false",
  },
  {
    name: "selected",
    type: "Boolean",
    default: "false",
  },
  {
    name: "pinned",
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
];

const slots: ISlotsTableData[] = [{ name: "overlay" }];

const exposes: IExposesTableData[] = [
  {
    name: "videoRef",
    type: `${docsLink(
      "HTMLVideoElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLVideoElement",
    )} | null`,
  },
];
</script>

<template>
  <div class="docs-api-table">
    <api-table
      title="NmorphMediaTile"
      name="media-tile"
      :attributes="attributesData"
      :slots="slots"
      :exposes="exposes"
    />
  </div>
</template>
