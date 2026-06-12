<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  NmorphAvatar,
  NmorphButton,
  NmorphIcon,
  NmorphIconLoaderDots,
  NmorphIconMute,
  NmorphIconShare,
  NmorphIconVideoCameraOff,
} from '@/components';
import { useModifiers } from '@/utils';
import type { INmorphMediaTileProps } from './types';

type SinkSelectableMediaElement = HTMLMediaElement & {
  setSinkId?: (sinkId: string) => Promise<void>;
};

const props = withDefaults(defineProps<INmorphMediaTileProps>(), {
  design: 'nmorph',
  aspect: 'video',
  src: '',
  srcObject: null,
  sinkId: undefined,
  fit: 'cover',
  mirrored: false,
  muted: true,
  autoplay: true,
  playsinline: true,
  name: '',
  avatarSrc: '',
  loading: false,
  showFallback: true,
  showStatus: true,
  micMuted: false,
  videoOff: false,
  screenSharing: false,
  speaking: false,
  selected: false,
  error: false,
  errorText: '',
});

const videoRef = ref<HTMLVideoElement | null>(null);
const audioRef = ref<HTMLAudioElement | null>(null);
const srcObjectTrackCount = ref({
  audio: 0,
  video: 0,
});
const hasMediaSource = computed(() => Boolean(props.src || props.srcObject));
const getAudioTracks = (stream: MediaStream | null) => {
  if (!stream || typeof stream.getAudioTracks !== 'function') return [];

  return stream.getAudioTracks();
};
const getVideoTracks = (stream: MediaStream | null) => {
  if (!stream || typeof stream.getVideoTracks !== 'function') return [];

  return stream.getVideoTracks();
};
const updateSrcObjectTrackCount = (stream: MediaStream | null) => {
  srcObjectTrackCount.value = {
    audio: getAudioTracks(stream).length,
    video: getVideoTracks(stream).length,
  };
};
const canInspectVideoTracks = computed(() => typeof props.srcObject?.getVideoTracks === 'function');
const hasVideoTracks = computed(() => srcObjectTrackCount.value.video > 0);
const hasVideoSource = computed(() =>
  Boolean(props.src || (props.srcObject && (!canInspectVideoTracks.value || hasVideoTracks.value)))
);
const videoVisible = computed(() => hasMediaSource.value && hasVideoSource.value && !props.videoOff && !props.error);
const needsSeparateAudioOutput = computed(() => Boolean(props.srcObject && !props.muted && !props.error));
const videoMuted = computed(() => props.muted || needsSeparateAudioOutput.value);
const videoSrc = computed(() => (videoVisible.value && props.src ? props.src : undefined));
const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
);
const fallbackLabel = computed(() => initials.value || props.name || '?');

const modifiers = computed(() =>
  useModifiers({
    'nmorph-media-tile': [
      props.design,
      props.aspect,
      props.fit,
      props.mirrored && 'mirrored',
      props.selected && 'selected',
      props.speaking && 'speaking',
      props.error && 'error',
      props.videoOff && 'video-off',
      props.screenSharing && 'screen-sharing',
      props.loading && 'loading',
    ],
  })
);

const setMediaElementSinkId = (element: HTMLMediaElement | null) => {
  if (!element || props.sinkId === undefined) return;

  const sinkElement = element as SinkSelectableMediaElement;

  if (typeof sinkElement.setSinkId !== 'function') return;

  void sinkElement.setSinkId(props.sinkId).catch(() => undefined);
};

const logMediaPlaybackError = (error: unknown) => {
  if (!import.meta.env.DEV) return;

  console.warn('[NmorphMediaTile] media autoplay failed', error);
};

const playMediaElement = (element: HTMLMediaElement | null) => {
  if (!element || !props.autoplay) return;

  let playResult: ReturnType<HTMLMediaElement['play']>;

  try {
    playResult = element.play();
  } catch (error) {
    logMediaPlaybackError(error);
    return;
  }

  if (playResult && typeof playResult.catch === 'function') {
    void playResult.catch(logMediaPlaybackError);
  }
};

watch(
  () => props.srcObject,
  (stream, _, onCleanup) => {
    updateSrcObjectTrackCount(stream);

    if (!stream || typeof stream.addEventListener !== 'function' || typeof stream.removeEventListener !== 'function')
      return;

    const updateTracks = () => updateSrcObjectTrackCount(stream);

    stream.addEventListener('addtrack', updateTracks);
    stream.addEventListener('removetrack', updateTracks);

    onCleanup(() => {
      stream.removeEventListener('addtrack', updateTracks);
      stream.removeEventListener('removetrack', updateTracks);
    });
  },
  { immediate: true }
);

watch(
  () =>
    [
      props.srcObject,
      props.sinkId,
      props.autoplay,
      props.videoOff,
      props.error,
      videoVisible.value,
      needsSeparateAudioOutput.value,
      videoMuted.value,
      videoRef.value,
      audioRef.value,
    ] as const,
  () => {
    if (videoRef.value) {
      const nextVideoStream = props.srcObject;

      if (videoRef.value.srcObject !== nextVideoStream) {
        videoRef.value.srcObject = nextVideoStream;
      }

      setMediaElementSinkId(videoRef.value);

      if (props.autoplay && nextVideoStream && !props.videoOff && !props.error) {
        playMediaElement(videoRef.value);
      }
    }

    if (audioRef.value) {
      const nextAudioStream = needsSeparateAudioOutput.value ? props.srcObject : null;

      if (audioRef.value.srcObject !== nextAudioStream) {
        audioRef.value.srcObject = nextAudioStream;
      }

      setMediaElementSinkId(audioRef.value);

      if (props.autoplay && needsSeparateAudioOutput.value) {
        playMediaElement(audioRef.value);
      }
    }
  },
  { immediate: true, flush: 'post' }
);

defineExpose({ videoRef });
</script>

<template>
  <div :class="modifiers">
    <video
      v-show="videoVisible && !props.loading"
      ref="videoRef"
      class="nmorph-media-tile__video"
      :src="videoSrc"
      :muted="videoMuted"
      :autoplay="props.autoplay"
      :playsinline="props.playsinline"
    />
    <audio
      v-if="needsSeparateAudioOutput"
      ref="audioRef"
      class="nmorph-media-tile__audio"
      :muted="props.muted"
      :autoplay="props.autoplay"
      preload="auto"
    />
    <div v-if="props.showFallback && (!videoVisible || props.loading)" class="nmorph-media-tile__fallback">
      <NmorphIcon v-if="props.loading" class="nmorph-media-tile__loader" size="large">
        <NmorphIconLoaderDots />
      </NmorphIcon>
      <NmorphAvatar v-else-if="props.avatarSrc" :src="props.avatarSrc" :name="props.name" :size="72" design="plain" />
      <div v-else class="nmorph-media-tile__initials">{{ fallbackLabel }}</div>
      <span v-if="props.name" class="nmorph-media-tile__name">{{ props.name }}</span>
      <span v-if="props.error && props.errorText" class="nmorph-media-tile__error-text">{{ props.errorText }}</span>
    </div>
    <div v-if="props.showStatus" class="nmorph-media-tile__status">
      <NmorphButton
        v-if="props.micMuted"
        class="nmorph-media-tile__status-item"
        design="plain"
        :tabindex="-1"
        aria-label="Microphone muted"
      >
        <template #icon-only>
          <NmorphIconMute />
        </template>
      </NmorphButton>
      <NmorphButton
        v-if="props.videoOff"
        class="nmorph-media-tile__status-item"
        design="plain"
        :tabindex="-1"
        aria-label="Video off"
      >
        <template #icon-only>
          <NmorphIconVideoCameraOff />
        </template>
      </NmorphButton>
      <NmorphButton
        v-if="props.screenSharing"
        class="nmorph-media-tile__status-item"
        design="plain"
        :tabindex="-1"
        aria-label="Screen sharing"
      >
        <template #icon-only>
          <NmorphIconShare />
        </template>
      </NmorphButton>
    </div>
    <slot name="overlay" />
  </div>
</template>

<style lang="scss">
.nmorph-media-tile {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
  background: var(--nmorph-main-color);
  border: none;
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  &.nmorph-media-tile--video {
    aspect-ratio: 16 / 9;
  }

  &.nmorph-media-tile--fill {
    width: 100%;
    height: 100%;
    aspect-ratio: auto;
  }

  .nmorph-media-tile__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.nmorph-media-tile--contain .nmorph-media-tile__video {
    object-fit: contain;
  }

  &.nmorph-media-tile--mirrored .nmorph-media-tile__video {
    transform: scaleX(-1);
  }

  .nmorph-media-tile__fallback {
    display: flex;
    flex-direction: column;
    gap: var(--indentation-02);
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: var(--indentation-04);
    color: var(--nmorph-text-color);
    text-align: center;
  }

  .nmorph-media-tile__initials {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 72px;
    color: var(--nmorph-focus-text-color);
    font-weight: var(--font-weight-bold);
    font-size: var(--nmorph-typography-title-large-font-size);
    background: var(--nmorph-accent-color);
    border-radius: var(--border-radius-circular);
  }

  .nmorph-media-tile__name,
  .nmorph-media-tile__error-text {
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-media-tile__error-text {
    color: var(--nmorph-error-text-color);
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
  }

  .nmorph-media-tile__status {
    position: absolute;
    right: var(--indentation-03);
    bottom: var(--indentation-03);
    display: flex;
    gap: var(--indentation-02);
  }

  .nmorph-media-tile__status-item {
    color: var(--nmorph-text-color);

    .nmorph-button__content {
      width: 28px;
      min-width: 28px;
      height: 24px;
      min-height: 24px;
      padding: 0;
      color: currentColor;
      background: color-mix(in srgb, var(--nmorph-main-color) 86%, transparent);
      border-color: color-mix(in srgb, currentColor 35%, transparent);
      border-radius: var(--default-border-radius);
    }
  }

  &.nmorph-media-tile--selected {
    outline: 2px solid var(--nmorph-accent-color);
  }

  &.nmorph-media-tile--speaking {
    outline: 3px solid var(--nmorph-success-color);
  }

  &.nmorph-media-tile--error {
    outline: 2px solid var(--nmorph-error-color);
  }

  &.nmorph-media-tile--plain {
    border: var(--nmorph-plain-border);
    box-shadow: none;
  }

  &.nmorph-media-tile--screen-sharing {
    box-shadow: 0 0 0 2px var(--nmorph-success-color);
  }
}
</style>
