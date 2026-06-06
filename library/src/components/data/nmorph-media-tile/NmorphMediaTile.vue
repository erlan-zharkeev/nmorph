<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  NmorphAvatar,
  NmorphIcon,
  NmorphIconLoaderDots,
  NmorphIconMic,
  NmorphIconPin,
  NmorphIconShare,
  NmorphIconVideo,
} from '@/components';
import { useModifiers } from '@/utils';
import type { INmorphMediaTileProps } from './types';

const props = withDefaults(defineProps<INmorphMediaTileProps>(), {
  src: '',
  srcObject: null,
  fit: 'cover',
  mirrored: false,
  muted: true,
  autoplay: true,
  playsinline: true,
  name: '',
  avatarSrc: '',
  loading: false,
  showFallback: true,
  micMuted: false,
  videoOff: false,
  screenSharing: false,
  speaking: false,
  selected: false,
  pinned: false,
  error: false,
  errorText: '',
});

const videoRef = ref<HTMLVideoElement | null>(null);
const hasVideo = computed(() => Boolean((props.src || props.srcObject) && !props.videoOff && !props.error));
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
      props.fit,
      props.mirrored && 'mirrored',
      props.selected && 'selected',
      props.pinned && 'pinned',
      props.speaking && 'speaking',
      props.error && 'error',
      props.videoOff && 'video-off',
      props.screenSharing && 'screen-sharing',
      props.loading && 'loading',
    ],
  })
);

watch(
  () => [props.srcObject, videoRef.value] as const,
  () => {
    if (videoRef.value && videoRef.value.srcObject !== props.srcObject) {
      videoRef.value.srcObject = props.srcObject;
    }
  },
  { immediate: true, flush: 'post' }
);

defineExpose({ videoRef });
</script>

<template>
  <div :class="modifiers">
    <video
      v-show="hasVideo && !props.loading"
      ref="videoRef"
      class="nmorph-media-tile__video"
      :src="props.src || undefined"
      :muted="props.muted"
      :autoplay="props.autoplay"
      :playsinline="props.playsinline"
    />
    <div v-if="props.showFallback && (!hasVideo || props.loading)" class="nmorph-media-tile__fallback">
      <NmorphIcon v-if="props.loading" class="nmorph-media-tile__loader" size="large">
        <NmorphIconLoaderDots />
      </NmorphIcon>
      <NmorphAvatar v-else-if="props.avatarSrc" :src="props.avatarSrc" :name="props.name" :size="72" />
      <div v-else class="nmorph-media-tile__initials">{{ fallbackLabel }}</div>
      <span v-if="props.name" class="nmorph-media-tile__name">{{ props.name }}</span>
      <span v-if="props.error && props.errorText" class="nmorph-media-tile__error-text">{{ props.errorText }}</span>
    </div>
    <div class="nmorph-media-tile__status">
      <span v-if="props.micMuted" class="nmorph-media-tile__status-item" aria-label="Microphone muted">
        <NmorphIcon size="small">
          <NmorphIconMic />
        </NmorphIcon>
      </span>
      <span v-if="props.videoOff" class="nmorph-media-tile__status-item" aria-label="Video off">
        <NmorphIcon size="small">
          <NmorphIconVideo />
        </NmorphIcon>
      </span>
      <span v-if="props.screenSharing" class="nmorph-media-tile__status-item" aria-label="Screen sharing">
        <NmorphIcon size="small">
          <NmorphIconShare />
        </NmorphIcon>
      </span>
      <span v-if="props.pinned" class="nmorph-media-tile__status-item" aria-label="Pinned">
        <NmorphIcon size="small">
          <NmorphIconPin />
        </NmorphIcon>
      </span>
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
  aspect-ratio: 16 / 9;
  min-width: 0;
  overflow: hidden;
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

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
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    color: var(--nmorph-text-color);
    background: color-mix(in srgb, var(--nmorph-main-color) 86%, transparent);
    border-radius: var(--border-radius-circular);
    box-shadow: var(--nmorph-shadow-outset);

    --nmorph-private-icon-color: currentColor;
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

  &.nmorph-media-tile--screen-sharing {
    box-shadow: 0 0 0 2px var(--nmorph-success-color);
  }
}
</style>
