<script setup lang="ts">
import {
  NmorphMediaGallery,
  type NmorphMediaGalleryItem,
} from "@nmorph/nmorph-ui-kit";

const videoSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const createImage = (label: string, accentColor: string, background: string) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <rect width="640" height="360" rx="24" fill="${background}" />
      <circle cx="146" cy="120" r="70" fill="${accentColor}" opacity=".9" />
      <path d="M70 300 245 180l92 70 74-54 160 104H70Z" fill="${accentColor}" opacity=".45" />
      <text x="48" y="72" fill="white" font-family="Arial, sans-serif" font-size="34" font-weight="700">${label}</text>
    </svg>
  `)}`;

const mediaItems = [
  {
    kind: "image",
    src: createImage("Moodboard", "#2f9e44", "#1d2528"),
    name: "Moodboard.png",
    size: 284000,
    alt: "Moodboard preview",
  },
  {
    kind: "video",
    src: videoSrc,
    poster: createImage("Flower clip", "#1c7ed6", "#1a1f24"),
    name: "Flower.mp4",
    size: 3407872,
    controls: true,
  },
  {
    kind: "image",
    src: createImage("Cover", "#f59f00", "#202328"),
    name: "Cover.png",
    size: 176000,
    alt: "Cover preview",
  },
] satisfies NmorphMediaGalleryItem[];
</script>

<template>
  <div class="media-gallery-basic-usage">
    <NmorphMediaGallery
      :items="mediaItems"
      show-trigger
      height="140px"
      preview-width="min(92vw, 860px)"
      preview-height="min(72vh, 520px)"
    />
  </div>
</template>

<style scoped>
.media-gallery-basic-usage {
  width: 100%;
}
</style>
