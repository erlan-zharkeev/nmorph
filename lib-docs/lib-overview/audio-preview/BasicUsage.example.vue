<script setup lang="ts">
import { NmorphAudioPreview } from "@nmorph/nmorph-ui-kit";

const audioSrc =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
</script>

<template>
  <div class="audio-preview-basic-usage">
    <NmorphAudioPreview
      :src="audioSrc"
      name="T-Rex roar"
      :duration-ms="2200"
      width="100%"
    />
  </div>
</template>

<style scoped>
.audio-preview-basic-usage {
  width: 100%;
}
</style>
