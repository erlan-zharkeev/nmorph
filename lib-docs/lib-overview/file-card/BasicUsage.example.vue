<script setup lang="ts">
import { NmorphFileCard } from "@nmorph/nmorph-ui-kit";

const launchCoverPreviewSrc = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#263b5f"/>
      <stop offset=".5" stop-color="#4e7fa8"/>
      <stop offset="1" stop-color="#f3b36f"/>
    </linearGradient>
    <linearGradient id="water" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#1d6f8f"/>
      <stop offset=".55" stop-color="#48a8b7"/>
      <stop offset="1" stop-color="#f1cc8b"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#fff8c7"/>
      <stop offset=".5" stop-color="#ffd76f"/>
      <stop offset="1" stop-color="#f1874a"/>
    </radialGradient>
  </defs>
  <rect width="640" height="360" rx="24" fill="url(#sky)"/>
  <circle cx="488" cy="94" r="58" fill="url(#sun)"/>
  <path d="M0 228 92 166l78 46 80-92 92 112 78-58 150 118 70-42v110H0Z" fill="#182b42" opacity=".76"/>
  <path d="M0 258 148 166l120 86 86-54 156 108 130-92v146H0Z" fill="#2f6f8f"/>
  <path d="M0 285 108 228l130 60 94-44 120 62 188-76v130H0Z" fill="#1d3f5d" opacity=".92"/>
  <rect y="292" width="640" height="68" fill="url(#water)"/>
  <path d="M54 320c78-18 124-12 206 2s138 10 244-18" fill="none" stroke="#ffe9b5" stroke-width="8" opacity=".62"/>
  <path d="M86 342c88-14 168-8 246 0 70 7 142 8 222-9" fill="none" stroke="#d7f7ff" stroke-width="5" opacity=".42"/>
</svg>
`)}`;
</script>

<template>
  <div class="file-card-basic-usage">
    <NmorphFileCard
      name="Product roadmap.pdf"
      extension="pdf"
      mime-type="application/pdf"
      :size="2480000"
      surface="soft"
    />
    <NmorphFileCard
      name="Launch-cover.png"
      extension="png"
      media-preview="image"
      :preview-src="launchCoverPreviewSrc"
      :size="732000"
      height="132px"
    />
    <NmorphFileCard
      name="Uploading archive.zip"
      extension="zip"
      loading
      compact
      surface="plain"
    />
  </div>
</template>

<style scoped>
.file-card-basic-usage {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
  gap: 12px;
}

@media (max-width: 780px) {
  .file-card-basic-usage {
    grid-template-columns: 1fr;
  }
}
</style>
