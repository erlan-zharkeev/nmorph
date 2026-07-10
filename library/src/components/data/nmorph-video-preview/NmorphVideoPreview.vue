<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  NmorphIcon,
  NmorphIconDownload,
  NmorphIconEye,
  NmorphIconExternalLink,
  NmorphIconFullScreen,
  NmorphIconLoader,
  NmorphOverlay,
  NmorphIconPause,
  NmorphIconPlay,
  NmorphIconVideo,
} from '@/components';
import { createCssSizeVariables, useMergedAttrs, useModifiers } from '@/utils';
import { cleanupMediaElement } from '@/utils/cleanup-media-element';
import type { INmorphVideoPreviewEmit, INmorphVideoPreviewProps } from './types';

const CONTRAST_ICON_COLOR = 'var(--nmorph-white-color)';
const VIDEO_BUFFER_EPSILON_SECONDS = 0.25;

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<INmorphVideoPreviewProps>(), {
  poster: '',
  name: '',
  width: undefined,
  height: undefined,
  previewWidth: undefined,
  previewHeight: undefined,
  durationMs: undefined,
  surface: 'card',
  embedded: false,
  showMeta: true,
  compact: false,
  controls: true,
  muted: false,
  playsinline: true,
  preload: 'metadata',
  fit: 'cover',
  downloadHref: '',
  loading: false,
  error: false,
  errorText: '',
  showPlaybackButton: true,
  showDefaultActions: true,
  showPreviewAction: true,
  showFullscreenAction: true,
  previewMode: 'internal',
});

const emit = defineEmits<INmorphVideoPreviewEmit>();
const slots = useSlots();
const videoRef = ref<HTMLVideoElement | null>(null);
const portalVideoRef = ref<HTMLVideoElement | null>(null);
const previewOpen = ref(false);
const playing = ref(false);
const videoLoaded = ref(false);
let isUnmounting = false;

const formatDuration = (durationMs?: number) => {
  if (!durationMs || durationMs < 0) return '';

  const totalSeconds = Math.round(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const duration = computed(() => formatDuration(props.durationMs));
const mediaReady = computed(() => Boolean(props.src) && !props.loading && !props.error);
const showPlaybackControl = computed(() => props.showPlaybackButton && mediaReady.value);
const resolvedPreload = computed(() =>
  props.showPlaybackButton && props.preload === 'metadata' ? 'auto' : props.preload
);
const showFullscreenAction = computed(() => props.showFullscreenAction && mediaReady.value && !props.controls);
const hasPreviewActions = computed(() => mediaReady.value && (props.showPreviewAction || showFullscreenAction.value));
const hasDefaultActions = computed(() => props.showDefaultActions && (props.src || props.downloadHref));
const hasActions = computed(() => Boolean(slots.actions) || hasPreviewActions.value || hasDefaultActions.value);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-video-preview': [
      props.surface,
      props.embedded && 'embedded',
      !props.showMeta && 'no-meta',
      props.compact && 'compact',
      props.fit,
      props.loading && 'loading',
      props.error && 'error',
      playing.value && 'playing',
      !hasActions.value && 'no-actions',
    ],
  })
);
const styles = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-video-preview-width': props.width,
    '--nmorph-private-video-preview-height': props.height,
    '--nmorph-private-video-preview-portal-width': props.previewWidth,
    '--nmorph-private-video-preview-portal-height': props.previewHeight,
  })
);
const rootAttrs = useMergedAttrs(modifiers, styles);

watch(
  () => [props.src, props.loading, props.error] as const,
  () => {
    playing.value = false;
    videoLoaded.value = false;
  }
);

const openHandler = () => emit('open');
const downloadHandler = () => emit('download');
const previewHandler = () => {
  if (props.previewMode === 'internal') previewOpen.value = true;
  emit('preview');
};
const closePreviewHandler = () => {
  previewOpen.value = false;
};

type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

const fullscreenHandler = async () => {
  const videoElement = videoRef.value as FullscreenVideoElement | null;
  if (!videoElement) return;

  emit('fullscreen');

  try {
    const request = videoElement.requestFullscreen?.() || videoElement.webkitRequestFullscreen?.();

    if (request) {
      await request;
      return;
    }

    videoElement.webkitEnterFullscreen?.();
  } catch {
    // Browser fullscreen APIs can reject outside trusted user gestures.
  }
};

const togglePlayback = async () => {
  if (!videoRef.value || props.loading || props.error) return;
  if (playing.value) {
    videoRef.value.pause();
    return;
  }

  try {
    await videoRef.value.play();
  } catch {
    playing.value = false;
  }
};

const isVideoFullyBuffered = (video: HTMLVideoElement) => {
  const duration = video.duration;

  if (!Number.isFinite(duration) || duration <= 0) return false;

  const buffered = video.buffered;
  const requiredEnd = Math.max(0, duration - VIDEO_BUFFER_EPSILON_SECONDS);

  for (let index = 0; index < buffered.length; index += 1) {
    try {
      if (buffered.start(index) <= VIDEO_BUFFER_EPSILON_SECONDS && buffered.end(index) >= requiredEnd) return true;
    } catch {
      return false;
    }
  }

  return false;
};

const updateVideoLoaded = () => {
  videoLoaded.value = videoRef.value ? isVideoFullyBuffered(videoRef.value) : false;
};

const playHandler = (event: Event) => {
  if (isUnmounting) return;

  playing.value = true;
  emit('play', event);
};

const pauseHandler = (event: Event) => {
  if (isUnmounting) return;

  playing.value = false;
  emit('pause', event);
};

const endedHandler = () => {
  playing.value = false;
};

const errorHandler = (event: Event) => {
  if (isUnmounting) return;

  playing.value = false;
  videoLoaded.value = false;
  emit('error', event);
};

onBeforeUnmount(() => {
  isUnmounting = true;
  cleanupMediaElement(videoRef.value);
  cleanupMediaElement(portalVideoRef.value);
});

defineExpose({ videoRef });
</script>

<template>
  <div v-bind="rootAttrs">
    <video
      v-if="!props.loading && !props.error"
      ref="videoRef"
      class="nmorph-video-preview__media"
      :src="props.src"
      :poster="props.poster || undefined"
      :controls="props.controls"
      :muted="props.muted"
      :playsinline="props.playsinline"
      :preload="resolvedPreload"
      @loadedmetadata="updateVideoLoaded"
      @durationchange="updateVideoLoaded"
      @progress="updateVideoLoaded"
      @canplaythrough="updateVideoLoaded"
      @suspend="updateVideoLoaded"
      @play="playHandler"
      @pause="pauseHandler"
      @ended="endedHandler"
      @error="errorHandler"
    />
    <button
      v-if="showPlaybackControl"
      class="nmorph-video-preview__play"
      type="button"
      :aria-label="playing ? `Pause ${props.name || 'video'}` : `Play ${props.name || 'video'}`"
      @click="togglePlayback"
    >
      <NmorphIcon size="medium" :color="CONTRAST_ICON_COLOR">
        <NmorphIconPause v-if="playing" />
        <NmorphIconPlay v-else />
      </NmorphIcon>
    </button>
    <div v-else class="nmorph-video-preview__state">
      <NmorphIcon v-if="props.loading" size="large">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="large">
        <NmorphIconVideo />
      </NmorphIcon>
      <span v-if="props.error && props.errorText" class="nmorph-video-preview__error">{{ props.errorText }}</span>
    </div>
    <div v-if="props.showMeta && (props.name || duration)" class="nmorph-video-preview__meta">
      <span v-if="props.name" class="nmorph-video-preview__name">{{ props.name }}</span>
      <span v-if="duration" class="nmorph-video-preview__duration">{{ duration }}</span>
    </div>
    <div v-if="hasActions" class="nmorph-video-preview__actions">
      <slot name="actions">
        <button
          v-if="props.showPreviewAction && mediaReady"
          type="button"
          class="nmorph-video-preview__action-button nmorph-video-preview__action-button--preview"
          :aria-label="`Preview ${props.name || 'video'}`"
          @click="previewHandler"
        >
          <NmorphIcon size="small" :color="CONTRAST_ICON_COLOR">
            <NmorphIconEye />
          </NmorphIcon>
        </button>
        <button
          v-if="showFullscreenAction"
          type="button"
          class="nmorph-video-preview__action-button nmorph-video-preview__action-button--fullscreen"
          :aria-label="`Fullscreen ${props.name || 'video'}`"
          @click="fullscreenHandler"
        >
          <NmorphIcon size="small" :color="CONTRAST_ICON_COLOR">
            <NmorphIconFullScreen />
          </NmorphIcon>
        </button>
        <a
          v-if="props.showDefaultActions && props.src"
          :href="props.src"
          target="_blank"
          rel="noopener noreferrer"
          class="nmorph-video-preview__action-link"
          :aria-label="`Open ${props.name || 'video'}`"
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
          class="nmorph-video-preview__action-link"
          :aria-label="`Download ${props.name || 'video'}`"
          @click="downloadHandler"
        >
          <NmorphIcon size="small">
            <NmorphIconDownload />
          </NmorphIcon>
        </a>
      </slot>
    </div>
  </div>
  <Teleport v-if="previewOpen" to="body">
    <div class="nmorph-video-preview__portal">
      <NmorphOverlay
        :show="previewOpen"
        disabled-teleport
        @on-outside-click="closePreviewHandler"
        @on-escape-keydown="closePreviewHandler"
      >
        <div class="nmorph-video-preview__portal-content">
          <video
            ref="portalVideoRef"
            class="nmorph-video-preview__portal-media"
            :src="props.src"
            :poster="props.poster || undefined"
            controls
            autoplay
            :muted="props.muted"
            :playsinline="props.playsinline"
            :preload="props.preload"
          />
        </div>
      </NmorphOverlay>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-video-preview {
  position: relative;
  display: flex;
  width: var(--nmorph-private-video-preview-width, 280px);
  min-width: 0;
  max-width: 100%;
  height: var(--nmorph-private-video-preview-height, 158px);
  overflow: hidden;
  color: var(--nmorph-white-color);
  background: color-mix(in srgb, var(--nmorph-black-color) 72%, var(--nmorph-main-color));
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  .nmorph-video-preview__media,
  .nmorph-video-preview__state {
    width: 100%;
    height: 100%;
  }

  &.nmorph-video-preview--soft .nmorph-video-preview__state,
  &.nmorph-video-preview--plain .nmorph-video-preview__state {
    color: var(--nmorph-text-color);
  }

  .nmorph-video-preview__media {
    display: block;
    object-fit: cover;
  }

  &.nmorph-video-preview--contain .nmorph-video-preview__media {
    object-fit: contain;
  }

  .nmorph-video-preview__state {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: var(--indentation-02);
    justify-content: center;
    align-items: center;
    padding: var(--indentation-03);
    text-align: center;
    pointer-events: none;
  }

  .nmorph-video-preview__error {
    max-width: 100%;
    overflow: hidden;
    color: var(--nmorph-error-text-color);
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-video-preview__meta {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    gap: var(--indentation-02);
    justify-content: space-between;
    align-items: center;
    padding: 18px var(--indentation-03) var(--indentation-02);
    background: linear-gradient(transparent, color-mix(in srgb, var(--nmorph-black-color) 66%, transparent));
    pointer-events: none;
  }

  .nmorph-video-preview__play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 42px;
    height: 42px;
    padding: 0;
    color: var(--nmorph-white-color);
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border: 0;
    border-radius: var(--border-radius-circular);
    transform: translate(-50%, -50%);
    cursor: pointer;

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }

    &:hover {
      background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
    }
  }

  &.nmorph-video-preview--playing .nmorph-video-preview__play {
    opacity: 0.72;
  }

  &.nmorph-video-preview--embedded {
    width: var(--nmorph-private-video-preview-width, 100%);
    height: var(--nmorph-private-video-preview-height, 120px);
    box-shadow: none;
  }

  .nmorph-video-preview__name,
  .nmorph-video-preview__duration {
    min-width: 0;
    overflow: hidden;
    font-size: var(--nmorph-typography-body-small-font-size);
    line-height: var(--nmorph-typography-body-small-line-height);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-video-preview__name {
    flex: 1 1 auto;
  }

  .nmorph-video-preview__duration {
    flex: 0 0 auto;
    font-variant-numeric: tabular-nums;
  }

  .nmorph-video-preview__actions {
    position: absolute;
    top: var(--indentation-02);
    right: var(--indentation-02);
    display: flex;
    gap: var(--indentation-01);
    padding: 0;
    background: transparent;
  }

  .nmorph-video-preview__action-button,
  .nmorph-video-preview__action-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    padding: 0;
    color: var(--nmorph-white-color);
    font: inherit;
    text-decoration: none;
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border: 0;
    border-radius: var(--default-border-radius);
    cursor: pointer;

    &:hover {
      background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
    }

    .nmorph-icon {
      --nmorph-private-icon-color: var(--nmorph-white-color);
    }
  }

  &.nmorph-video-preview--compact {
    width: var(--nmorph-private-video-preview-width, 180px);
    height: var(--nmorph-private-video-preview-height, 102px);
  }

  &.nmorph-video-preview--soft {
    background: color-mix(in srgb, var(--nmorph-accent-color) 6%, transparent);
    box-shadow: none;
  }

  &.nmorph-video-preview--plain {
    background: transparent;
    box-shadow: none;
  }

  &.nmorph-video-preview--error {
    outline: 1px solid var(--nmorph-error-text-color);
  }
}

.nmorph-video-preview__portal {
  display: contents;

  .nmorph-video-preview__portal-content {
    --nmorph-private-video-preview-portal-width: min(calc(100vw - 96px), 1080px);
    --nmorph-private-video-preview-portal-height: min(calc(100vh - 180px), 720px);

    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-private-video-preview-portal-width);
    height: var(--nmorph-private-video-preview-portal-height);
    transform: translate(-50%, -50%);
  }

  .nmorph-video-preview__portal-media {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    object-fit: contain;
    background: var(--nmorph-black-color);
    border-radius: var(--default-border-radius);
  }
}
</style>
