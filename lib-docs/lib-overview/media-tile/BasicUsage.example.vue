<script setup lang="ts">
import { NmorphMediaTile } from "@nmorph/nmorph-ui-kit";

const videoSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
</script>

<template>
  <div class="media-tile-basic-usage">
    <NmorphMediaTile
      :src="videoSrc"
      name="Elena Park"
      speaking
      selected
      muted
    />
    <NmorphMediaTile name="Nikita Kim" video-off mic-muted />
    <NmorphMediaTile name="Hidden status" video-off :show-status="false" />
    <NmorphMediaTile loading name="Preparing stream" />
  </div>
</template>

<style scoped>
.media-tile-basic-usage {
  display: grid;
  width: 100%;
  max-width: 720px;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 12px;
}

@media (max-width: 520px) {
  .media-tile-basic-usage {
    grid-template-columns: 1fr;
  }
}
</style>
