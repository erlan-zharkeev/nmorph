<script setup lang="ts">
import { NmorphFileCard } from "@nmorph/nmorph-ui-kit";
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
      preview-src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' rx='24' fill='%231d2528'/%3E%3Ccircle cx='170' cy='136' r='82' fill='%232f9e44'/%3E%3Cpath d='M70 302 240 184l90 68 80-56 160 106H70Z' fill='%2374c0fc' opacity='.55'/%3E%3C/svg%3E"
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
