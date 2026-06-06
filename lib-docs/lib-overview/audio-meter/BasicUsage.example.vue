<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";
import {
  NmorphAudioMeter,
  NmorphButton,
  NmorphSpace,
} from "@nmorph/nmorph-ui-kit";

const level = ref(0);
const listening = ref(false);
const errorMessage = ref("");

let stream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let animationId = 0;

const createAudioContext = () => {
  const AudioContextConstructor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextConstructor) throw new Error("AudioContext is unavailable.");
  return new AudioContextConstructor();
};

const stopMeter = () => {
  listening.value = false;
  level.value = 0;

  if (animationId) cancelAnimationFrame(animationId);
  animationId = 0;

  stream?.getTracks().forEach((track) => track.stop());
  stream = null;

  if (audioContext) void audioContext.close();
  audioContext = null;
};

const startMeter = async () => {
  if (listening.value) return;

  errorMessage.value = "";

  try {
    if (!navigator.mediaDevices?.getUserMedia)
      throw new Error("Media devices are unavailable.");

    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = createAudioContext();

    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);

    const samples = new Uint8Array(analyser.frequencyBinCount);
    listening.value = true;

    const updateLevel = () => {
      analyser.getByteTimeDomainData(samples);

      let sum = 0;

      samples.forEach((sample) => {
        const centered = (sample - 128) / 128;
        sum += centered * centered;
      });

      level.value = Math.min(Math.sqrt(sum / samples.length) * 2.8, 1);
      animationId = requestAnimationFrame(updateLevel);
    };

    updateLevel();
  } catch {
    errorMessage.value = "Microphone access is unavailable.";
    stopMeter();
  }
};

onBeforeUnmount(stopMeter);
</script>

<template>
  <div class="audio-meter-basic-usage">
    <NmorphSpace align="center" :wrap="true">
      <NmorphButton
        design="nmorph"
        thickness="basic"
        @click="listening ? stopMeter() : startMeter()"
      >
        {{ listening ? "Stop microphone" : "Start microphone" }}
      </NmorphButton>
      <span v-if="errorMessage" class="audio-meter-basic-usage__error">
        {{ errorMessage }}
      </span>
    </NmorphSpace>

    <div class="audio-meter-basic-usage__meters">
      <NmorphAudioMeter :value="level" label="Microphone level" />
      <NmorphAudioMeter :value="level" variant="line" label="Line level" />
      <NmorphAudioMeter :value="level" variant="ring" label="Ring level" />
    </div>
  </div>
</template>

<style scoped>
.audio-meter-basic-usage {
  display: grid;
  width: 100%;
  gap: 16px;
}

.audio-meter-basic-usage__meters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(220px, 1fr) auto;
  gap: 16px;
  align-items: center;
}

.audio-meter-basic-usage__error {
  color: var(--nmorph-error-text-color);
}

@media (max-width: 680px) {
  .audio-meter-basic-usage__meters {
    grid-template-columns: 1fr;
  }
}
</style>
