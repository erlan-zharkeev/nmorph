<script setup lang="ts">
import { NmorphVideoPreview } from "@nmorph/nmorph-ui-kit";

const videoSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const poster = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
    <rect width="640" height="360" rx="24" fill="#1a1f24" />
    <circle cx="186" cy="142" r="76" fill="#2f9e44" opacity=".88" />
    <path d="M68 300 238 184l96 70 74-56 164 102H68Z" fill="#74c0fc" opacity=".5" />
    <text x="44" y="70" fill="white" font-family="Arial, sans-serif" font-size="34" font-weight="700">Flower clip</text>
  </svg>
`)}`;
</script>

<template>
  <div class="video-preview-basic-usage">
    <NmorphVideoPreview
      :src="videoSrc"
      :poster="poster"
      name="Flower clip"
      width="100%"
      height="220px"
      :duration-ms="5500"
      preview-width="min(92vw, 860px)"
      preview-height="min(72vh, 520px)"
    />
  </div>
</template>

<style scoped>
.video-preview-basic-usage {
  width: 100%;
}
</style>
