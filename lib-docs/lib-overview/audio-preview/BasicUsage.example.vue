<script setup lang="ts">
import { NmorphAudioPreview } from "@nmorph/nmorph-ui-kit";
import { createSoftPingAudioSrc } from "~/utils";

const durationMs = 350;
const audioSrc = ref("");

onMounted(() => {
  audioSrc.value = createSoftPingAudioSrc(durationMs);
});
</script>

<template>
  <div class="audio-preview-basic-usage">
    <NmorphAudioPreview
      :src="audioSrc"
      name="Soft ping"
      :duration-ms="durationMs"
      width="100%"
    />
  </div>
</template>

<style scoped>
.audio-preview-basic-usage {
  width: 100%;
}
</style>
