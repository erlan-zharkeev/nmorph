<script setup lang="ts">
import { computed, ref, useSlots, watch, type CSSProperties } from 'vue';
import {
  NmorphIcon,
  NmorphIconAudio,
  NmorphIconDownload,
  NmorphIconExternalLink,
  NmorphIconLoader,
  NmorphIconPause,
  NmorphIconPlay,
} from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import type { INmorphAudioPreviewEmit, INmorphAudioPreviewProps } from './types';

const CONTRAST_ICON_COLOR = 'var(--nmorph-white-color)';

const props = withDefaults(defineProps<INmorphAudioPreviewProps>(), {
  name: '',
  durationMs: undefined,
  width: undefined,
  surface: 'card',
  embedded: false,
  showIcon: true,
  showHeader: true,
  compact: false,
  preload: 'metadata',
  downloadHref: '',
  loading: false,
  error: false,
  errorText: '',
  showPlaybackButton: true,
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
const progressStyle = computed<CSSProperties>(() => ({
  '--nmorph-private-audio-preview-progress': `${progress.value}%`,
}));
const hasActions = computed(
  () => Boolean(slots.actions) || (props.showDefaultActions && (props.src || props.downloadHref))
);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-audio-preview': [
      props.surface,
      props.embedded && 'embedded',
      !props.showIcon && 'no-icon',
      !props.showHeader && 'no-header',
      props.compact && 'compact',
      props.loading && 'loading',
      props.error && 'error',
      playing.value && 'playing',
      !hasActions.value && 'no-actions',
    ],
  })
);
const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-audio-preview-width': props.width,
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
  if (!audioRef.value || !props.showPlaybackButton || props.loading || props.error) return;
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
    <button
      v-if="props.showIcon && props.showPlaybackButton"
      class="nmorph-audio-preview__icon"
      type="button"
      :disabled="props.loading || props.error"
      :aria-label="playing ? `Pause ${props.name || 'audio'}` : `Play ${props.name || 'audio'}`"
      @click="togglePlayback"
    >
      <NmorphIcon v-if="props.loading" size="medium">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="medium">
        <NmorphIconAudio />
      </NmorphIcon>
      <span v-if="!props.loading && !props.error" class="nmorph-audio-preview__play-indicator">
        <NmorphIcon size="small" :color="CONTRAST_ICON_COLOR">
          <NmorphIconPause v-if="playing" />
          <NmorphIconPlay v-else />
        </NmorphIcon>
      </span>
    </button>
    <div v-else-if="props.showIcon" class="nmorph-audio-preview__icon">
      <NmorphIcon v-if="props.loading" size="medium">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="medium">
        <NmorphIconAudio />
      </NmorphIcon>
    </div>
    <button
      v-else-if="props.showPlaybackButton && !props.loading && !props.error"
      class="nmorph-audio-preview__play-button"
      type="button"
      :aria-label="playing ? `Pause ${props.name || 'audio'}` : `Play ${props.name || 'audio'}`"
      @click="togglePlayback"
    >
      <NmorphIcon size="small" :color="CONTRAST_ICON_COLOR">
        <NmorphIconPause v-if="playing" />
        <NmorphIconPlay v-else />
      </NmorphIcon>
    </button>
    <div class="nmorph-audio-preview__body">
      <div v-if="props.showHeader" class="nmorph-audio-preview__header">
        <span class="nmorph-audio-preview__name">{{ props.name || 'Audio' }}</span>
        <span v-if="props.error && props.errorText" class="nmorph-audio-preview__error">{{ props.errorText }}</span>
        <span v-else class="nmorph-audio-preview__time">{{ currentTimeLabel }} / {{ durationLabel }}</span>
      </div>
      <div class="nmorph-audio-preview__control">
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
        <span v-if="!props.showHeader" class="nmorph-audio-preview__time"
          >{{ currentTimeLabel }} / {{ durationLabel }}</span
        >
      </div>
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
            <NmorphIconExternalLink />
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
  width: var(--nmorph-private-audio-preview-width, 360px);
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
    position: relative;
    display: flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    padding: 0;
    color: var(--nmorph-text-color);
    background: color-mix(in srgb, var(--nmorph-text-color) 10%, transparent);
    border: 0;
    border-radius: var(--default-border-radius);
    cursor: default;

    --nmorph-private-icon-color: currentColor;
  }

  button.nmorph-audio-preview__icon {
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }

  .nmorph-audio-preview__play-button {
    display: inline-flex;
    flex: 0 0 auto;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    padding: 0;
    color: var(--nmorph-white-color);
    background: var(--nmorph-black-color);
    border: 0;
    border-radius: var(--border-radius-circular);
    cursor: pointer;

    &:hover {
      background: var(--nmorph-accent-color);
    }

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }
  }

  .nmorph-audio-preview__play-indicator {
    position: absolute;
    right: -4px;
    bottom: -4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    color: var(--nmorph-white-color);
    background: var(--nmorph-black-color);
    border-radius: var(--border-radius-circular);

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }
  }

  .nmorph-audio-preview__body {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: var(--indentation-02);
    box-sizing: border-box;
    min-width: 0;
  }

  .nmorph-audio-preview__header {
    display: flex;
    gap: var(--indentation-02);
    justify-content: space-between;
    align-items: center;
    min-width: 0;
  }

  .nmorph-audio-preview__control {
    display: flex;
    gap: var(--indentation-02);
    align-items: center;
    width: 100%;
    min-width: 0;
  }

  .nmorph-audio-preview__name,
  .nmorph-audio-preview__time,
  .nmorph-audio-preview__error {
    min-width: 0;
    overflow: hidden;
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-audio-preview__name {
    flex: 1 1 auto;
    font-weight: var(--font-weight-semibold);
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
    flex: 1 1 0;
    width: 100%;
    min-width: 0;
    height: 6px;
    padding: 0;
    background: linear-gradient(
      to right,
      var(--nmorph-accent-color) var(--nmorph-private-audio-preview-progress, 0%),
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
      --nmorph-private-icon-color: currentColor;
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

  &.nmorph-audio-preview--no-actions {
    .nmorph-audio-preview__body {
      padding-inline-end: var(--indentation-02);
    }
  }

  &.nmorph-audio-preview--embedded {
    width: var(--nmorph-private-audio-preview-width, 100%);
    min-height: auto;
    padding: 0;
    background: transparent;
    border-radius: 0;
    box-shadow: none;

    .nmorph-audio-preview__body {
      gap: 0;
      padding-inline-end: 0;
    }

    .nmorph-audio-preview__range {
      height: 5px;
    }

    .nmorph-audio-preview__range::-webkit-slider-thumb {
      width: 11px;
      height: 11px;
      box-shadow: none;
    }

    .nmorph-audio-preview__range::-moz-range-thumb {
      width: 11px;
      height: 11px;
      box-shadow: none;
    }

    .nmorph-audio-preview__play-indicator {
      box-shadow: none;
    }
  }

  &.nmorph-audio-preview--no-header {
    .nmorph-audio-preview__time {
      flex: 0 0 auto;
    }
  }

  &.nmorph-audio-preview--soft {
    background: color-mix(in srgb, var(--nmorph-accent-color) 6%, transparent);
    box-shadow: none;
  }

  &.nmorph-audio-preview--plain {
    background: transparent;
    box-shadow: none;
  }

  &.nmorph-audio-preview--error {
    outline: 1px solid var(--nmorph-error-text-color);
  }
}
</style>
