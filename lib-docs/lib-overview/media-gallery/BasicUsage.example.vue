<script setup lang="ts">
import {
  NmorphMediaGallery,
  type NmorphMediaGalleryItem,
} from "@nmorph/nmorph-ui-kit";

const videoSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const activeIndex = ref(0);

const createImage = (
  title: string,
  subtitle: string,
  startColor: string,
  endColor: string,
  accentColor: string,
) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 560">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${startColor}" />
          <stop offset="1" stop-color="${endColor}" />
        </linearGradient>
        <radialGradient id="glow" cx=".68" cy=".26" r=".72">
          <stop stop-color="${accentColor}" stop-opacity=".72" />
          <stop offset=".58" stop-color="${accentColor}" stop-opacity=".16" />
          <stop offset="1" stop-color="${accentColor}" stop-opacity="0" />
        </radialGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="900" height="560" rx="34" fill="url(#bg)" />
      <rect width="900" height="560" rx="34" fill="url(#glow)" />
      <circle cx="690" cy="132" r="96" fill="${accentColor}" opacity=".86" filter="url(#blur)" />
      <path d="M0 424 C108 330 190 318 286 372 C377 421 465 266 584 304 C690 338 755 452 900 356 L900 560 L0 560 Z" fill="#ffffff" opacity=".18" />
      <path d="M0 468 C138 366 214 376 330 428 C436 476 522 332 636 370 C734 402 798 480 900 430 L900 560 L0 560 Z" fill="${accentColor}" opacity=".34" />
      <path d="M78 178 C164 102 284 92 366 158 C454 229 566 150 684 178" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity=".38" />
      <circle cx="126" cy="146" r="8" fill="#ffffff" opacity=".72" />
      <circle cx="750" cy="238" r="6" fill="#ffffff" opacity=".56" />
      <text x="58" y="86" fill="white" font-family="Arial, sans-serif" font-size="42" font-weight="700">${title}</text>
      <text x="60" y="126" fill="white" font-family="Arial, sans-serif" font-size="22" font-weight="600" opacity=".78">${subtitle}</text>
    </svg>
  `)}`;

const mediaItems = [
  {
    kind: "image",
    src: createImage("Aurora Desk", "Moodboard", "#102126", "#314f41", "#59d18f"),
    name: "Aurora-moodboard.png",
    size: 284000,
    alt: "Moodboard preview",
    aspectRatio: 1.46,
    itemClass: "media-gallery-basic-usage__trigger-item",
  },
  {
    kind: "video",
    src: videoSrc,
    poster: createImage("Glasshouse", "Short film", "#171b2a", "#173d5f", "#57b7ff"),
    name: "Glasshouse-bloom.mp4",
    size: 3407872,
    controls: true,
    aspectRatio: 16 / 9,
    itemClass: "media-gallery-basic-usage__trigger-item",
  },
  {
    kind: "image",
    src: createImage("Sun Archive", "Cover study", "#251b16", "#6b3f1d", "#ffb84d"),
    name: "Sun-archive-cover.png",
    size: 176000,
    alt: "Cover preview",
    aspectRatio: 1.46,
    itemClass: "media-gallery-basic-usage__trigger-item",
  },
] satisfies NmorphMediaGalleryItem[];
</script>

<template>
  <div class="media-gallery-basic-usage">
    <NmorphMediaGallery
      v-model:active-index="activeIndex"
      :items="mediaItems"
      show-trigger
      trigger-image-fit="cover"
      trigger-video-fit="cover"
      preview-width="min(92vw, 860px)"
      preview-height="min(72vh, 520px)"
    />
  </div>
</template>

<style scoped>
.media-gallery-basic-usage {
  width: 100%;
}

.media-gallery-basic-usage :deep(.nmorph-media-gallery__trigger) {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.media-gallery-basic-usage :deep(.media-gallery-basic-usage__trigger-item) {
  background: color-mix(in srgb, var(--nmorph-accent-color) 8%, var(--nmorph-main-color));
}
</style>
