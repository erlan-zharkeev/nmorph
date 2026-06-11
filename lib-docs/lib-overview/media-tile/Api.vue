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
    description: "Video source URL.",
  },
  {
    name: "src-object",
    type: "MediaStream | null",
    default: "null",
    description: "Live media stream assigned to the video element.",
  },
  {
    name: "sink-id",
    type: "String",
    default: "-",
    description: "Audio output device id applied through setSinkId when the browser supports it.",
  },
  {
    name: "fit",
    type: "'cover' | 'contain'",
    default: "cover",
    description: "Object fit used by the video.",
  },
  {
    name: "mirrored",
    type: "Boolean",
    default: "false",
    description: "Mirrors the video horizontally.",
  },
  {
    name: "muted",
    type: "Boolean",
    default: "true",
    description: "Mutes the native video element.",
  },
  {
    name: "autoplay",
    type: "Boolean",
    default: "true",
    description: "Enables native video autoplay.",
  },
  {
    name: "playsinline",
    type: "Boolean",
    default: "true",
    description: "Enables inline playback on mobile browsers.",
  },
  {
    name: "name",
    type: "String",
    default: "-",
    description: "Participant or stream name shown in fallback state.",
  },
  {
    name: "avatar-src",
    type: "String",
    default: "-",
    description: "Avatar image used when video is unavailable.",
  },
  {
    name: "loading",
    type: "Boolean",
    default: "false",
    description: "Shows the loading fallback.",
  },
  {
    name: "show-fallback",
    type: "Boolean",
    default: "true",
    description: "Shows fallback content when video is not available.",
  },
  {
    name: "show-status",
    type: "Boolean",
    default: "true",
    description: "Shows the bottom-right status overlay.",
  },
  {
    name: "mic-muted",
    type: "Boolean",
    default: "false",
    description: "Shows the microphone muted status.",
  },
  {
    name: "video-off",
    type: "Boolean",
    default: "false",
    description: "Shows the video off fallback.",
  },
  {
    name: "screen-sharing",
    type: "Boolean",
    default: "false",
    description: "Marks the tile as a screen sharing stream.",
  },
  {
    name: "speaking",
    type: "Boolean",
    default: "false",
    description: "Highlights the tile as actively speaking.",
  },
  {
    name: "selected",
    type: "Boolean",
    default: "false",
    description: "Highlights the tile as selected.",
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
    description: "Error message displayed in fallback state.",
  },
];

const slots: ISlotsTableData[] = [
  { name: "overlay", description: "Custom overlay rendered above the tile." },
];

const exposes: IExposesTableData[] = [
  {
    name: "videoRef",
    type: `${docsLink(
      "HTMLVideoElement",
      "https://developer.mozilla.org/ru/docs/Web/API/HTMLVideoElement",
    )} | null`,
    description: "Native video element reference.",
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
