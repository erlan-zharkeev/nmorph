<script setup lang="ts">
import { computed, ref, useSlots, watch, type CSSProperties } from 'vue';
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconAudio,
  NmorphIconDownload,
  NmorphIconLoader,
  NmorphIconOpen,
  NmorphIconPause,
  NmorphIconPlay,
} from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import type { INmorphAudioPreviewEmit, INmorphAudioPreviewProps } from './types';

const props = withDefaults(defineProps<INmorphAudioPreviewProps>(), {
  name: '',
  durationMs: undefined,
  width: undefined,
  compact: false,
  preload: 'metadata',
  downloadHref: '',
  loading: false,
  error: false,
  errorText: '',
  showDefaultActions: true,
});

const emit = defineEmits<INmorphAudioPreviewEmit>();
const slots = useSlots();
const audioRef = ref<HTMLAudioElement | null>(null);
const playing = ref(false);
const currentTime = ref(0);
const durationSeconds = ref(props.durationMs ? props.durationMs / 1000 : 0);

watch(
  () => props.durationMs,
  (durationMs) => {
    durationSeconds.value = durationMs ? durationMs / 1000 : durationSeconds.value;
  }
);

const resolvedDuration = computed(() => durationSeconds.value || 0);
const progress = computed({
  get: () => (resolvedDuration.value > 0 ? (currentTime.value / resolvedDuration.value) * 100 : 0),
  set: (value: number) => {
    if (!audioRef.value || resolvedDuration.value <= 0) return;
    audioRef.value.currentTime = (value / 100) * resolvedDuration.value;
    currentTime.value = audioRef.value.currentTime;
  },
});
const progressStyle = computed<CSSProperties>(() => ({ '--nmorph-audio-preview-progress': `${progress.value}%` }));
const hasActions = computed(
  () => Boolean(slots.actions) || (props.showDefaultActions && (props.src || props.downloadHref))
);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-audio-preview': [
      props.compact && 'compact',
      props.loading && 'loading',
      props.error && 'error',
      playing.value && 'playing',
    ],
  })
);
const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-audio-preview-width': props.width,
  })
);

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const roundedSeconds = Math.floor(seconds);
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const currentTimeLabel = computed(() => formatTime(currentTime.value));
const durationLabel = computed(() => formatTime(resolvedDuration.value));

const togglePlayback = async () => {
  if (!audioRef.value || props.loading || props.error) return;
  if (playing.value) {
    audioRef.value.pause();
    return;
  }

  try {
    await audioRef.value.play();
  } catch {
    playing.value = false;
  }
};

const loadedMetadataHandler = () => {
  if (!audioRef.value || Number.isNaN(audioRef.value.duration)) return;
  durationSeconds.value = audioRef.value.duration;
};

const timeUpdateHandler = () => {
  currentTime.value = audioRef.value?.currentTime || 0;
};

const playHandler = (event: Event) => {
  playing.value = true;
  emit('play', event);
};

const pauseHandler = (event: Event) => {
  playing.value = false;
  emit('pause', event);
};

const endedHandler = () => {
  playing.value = false;
};

const errorHandler = (event: Event) => {
  playing.value = false;
  emit('error', event);
};

const openHandler = () => emit('open');
const downloadHandler = () => emit('download');

defineExpose({ audioRef });
</script>

<template>
  <div :class="modifiers" :style="styles">
    <audio
      ref="audioRef"
      :src="props.src"
      :preload="props.preload"
      @loadedmetadata="loadedMetadataHandler"
      @timeupdate="timeUpdateHandler"
      @play="playHandler"
      @pause="pauseHandler"
      @ended="endedHandler"
      @error="errorHandler"
    />
    <div class="nmorph-audio-preview__icon">
      <NmorphIcon v-if="props.loading" size="medium">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="medium">
        <NmorphIconAudio />
      </NmorphIcon>
    </div>
    <NmorphButton
      class="nmorph-audio-preview__play"
      height="thin"
      style-type="transparent"
      :disabled="props.loading || props.error"
      @click="togglePlayback"
    >
      <template #icon-only>
        <NmorphIconPause v-if="playing" />
        <NmorphIconPlay v-else />
      </template>
    </NmorphButton>
    <div class="nmorph-audio-preview__body">
      <div class="nmorph-audio-preview__header">
        <span class="nmorph-audio-preview__name">{{ props.name || 'Audio' }}</span>
        <span v-if="props.error && props.errorText" class="nmorph-audio-preview__error">{{ props.errorText }}</span>
        <span v-else class="nmorph-audio-preview__time">{{ currentTimeLabel }} / {{ durationLabel }}</span>
      </div>
      <input
        v-model.number="progress"
        class="nmorph-audio-preview__range"
        type="range"
        min="0"
        max="100"
        step="0.1"
        :style="progressStyle"
        :disabled="props.loading || props.error || resolvedDuration <= 0"
        :aria-label="`Audio progress ${props.name || ''}`"
      />
    </div>
    <div v-if="hasActions" class="nmorph-audio-preview__actions">
      <slot name="actions">
        <a
          :href="props.src"
          target="_blank"
          rel="noopener noreferrer"
          class="nmorph-audio-preview__action-link"
          :aria-label="`Open ${props.name || 'audio'}`"
          @click="openHandler"
        >
          <NmorphIcon size="small">
            <NmorphIconOpen />
          </NmorphIcon>
        </a>
        <a
          v-if="props.downloadHref"
          :href="props.downloadHref"
          :download="props.name"
          class="nmorph-audio-preview__action-link"
          :aria-label="`Download ${props.name || 'audio'}`"
          @click="downloadHandler"
        >
          <NmorphIcon size="small">
            <NmorphIconDownload />
          </NmorphIcon>
        </a>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-audio-preview {
  display: flex;
  gap: var(--indentation-02);
  align-items: center;
  box-sizing: border-box;
  width: var(--nmorph-audio-preview-width, 360px);
  min-width: 0;
  max-width: 100%;
  min-height: 64px;
  padding: var(--indentation-03);
  color: var(--nmorph-text-color);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  audio {
    display: none;
  }

  .nmorph-audio-preview__icon {
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    color: var(--nmorph-accent-color);
    background: color-mix(in srgb, var(--nmorph-accent-color) 12%, transparent);
    border-radius: var(--default-border-radius);

    --color: currentColor;
  }

  .nmorph-audio-preview__play {
    flex: 0 0 auto;
  }

  .nmorph-audio-preview__body {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: var(--indentation-02);
    min-width: 0;
  }

  .nmorph-audio-preview__header {
    display: flex;
    gap: var(--indentation-02);
    justify-content: space-between;
    align-items: center;
    min-width: 0;
  }

  .nmorph-audio-preview__name,
  .nmorph-audio-preview__time,
  .nmorph-audio-preview__error {
    min-width: 0;
    overflow: hidden;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-audio-preview__name {
    flex: 1 1 auto;
    font-weight: 600;
  }

  .nmorph-audio-preview__time {
    flex: 0 0 auto;
    color: var(--nmorph-semi-contrast-text-color);
    font-variant-numeric: tabular-nums;
  }

  .nmorph-audio-preview__error {
    flex: 0 1 auto;
    color: var(--nmorph-error-text-color);
  }

  .nmorph-audio-preview__range {
    width: 100%;
    min-width: 0;
    height: 6px;
    padding: 0;
    background: linear-gradient(
      to right,
      var(--nmorph-accent-color) var(--nmorph-audio-preview-progress, 0%),
      color-mix(in srgb, var(--nmorph-text-color) 16%, transparent) 0
    );
    border-radius: var(--border-radius-100);
    outline: 0;
    cursor: pointer;
    appearance: none;
  }

  .nmorph-audio-preview__range:disabled {
    cursor: default;
    opacity: 0.6;
  }

  .nmorph-audio-preview__range::-webkit-slider-thumb {
    width: 14px;
    height: 14px;
    background: var(--nmorph-accent-color);
    border: 2px solid var(--nmorph-main-color);
    border-radius: var(--border-radius-circular);
    box-shadow: var(--nmorph-shadow-outset);
    appearance: none;
  }

  .nmorph-audio-preview__range::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--nmorph-accent-color);
    border: 2px solid var(--nmorph-main-color);
    border-radius: var(--border-radius-circular);
    box-shadow: var(--nmorph-shadow-outset);
  }

  .nmorph-audio-preview__actions {
    display: flex;
    flex: 0 0 auto;
    gap: var(--indentation-01);
    align-items: center;
  }

  .nmorph-audio-preview__action-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    color: inherit;
    text-decoration: none;
    border-radius: var(--default-border-radius);

    &:hover {
      color: var(--nmorph-accent-color);
      background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
    }

    .nmorph-icon {
      --color: currentColor;
    }
  }

  &.nmorph-audio-preview--compact {
    min-height: 52px;
    padding: var(--indentation-02);

    .nmorph-audio-preview__icon {
      width: 30px;
      height: 30px;
    }
  }

  &.nmorph-audio-preview--error {
    outline: 1px solid var(--nmorph-error-color);
  }
}
</style>
