<script setup lang="ts">
import { computed, useSlots, type Component } from 'vue';
import {
  NmorphIcon,
  NmorphIconArchive,
  NmorphIconAudio,
  NmorphIconDoc,
  NmorphIconDownload,
  NmorphIconEye,
  NmorphIconImage,
  NmorphIconLoader,
  NmorphIconOpen,
  NmorphIconVideo,
} from '@/components';
import { getFileExtension, getPlainFileType, getTypeCandidates, isKnownFileType, useModifiers } from '@/utils';
import {
  NmorphArchiveResolution,
  NmorphAudioResolution,
  NmorphDocResolution,
  NmorphImageResolution,
  NmorphVideoResolution,
} from '@/components/form/nmorph-file-upload/types';
import NmorphAudioPreview from '../nmorph-audio-preview/NmorphAudioPreview.vue';
import NmorphVideoPreview from '../nmorph-video-preview/NmorphVideoPreview.vue';
import type { INmorphFileCardEmit, INmorphFileCardProps } from './types';

const props = withDefaults(defineProps<INmorphFileCardProps>(), {
  extension: '',
  mimeType: '',
  size: undefined,
  previewSrc: '',
  downloadHref: '',
  mediaPreview: 'none',
  surface: 'card',
  showExtensionBadge: true,
  iconSurface: true,
  compact: false,
  loading: false,
  error: false,
  errorText: '',
  showDefaultActions: true,
});

const emit = defineEmits<INmorphFileCardEmit>();
const slots = useSlots();

const extension = computed(() => {
  return (props.extension || getFileExtension(props.name) || getPlainFileType(props.mimeType)).toLowerCase();
});
const candidates = computed(() => getTypeCandidates(props.mimeType, props.name));
const icon = computed<Component>(() => {
  if (
    props.mimeType.toLowerCase().startsWith('image/') ||
    candidates.value.some((type) => isKnownFileType(type, NmorphImageResolution))
  ) {
    return NmorphIconImage;
  }
  if (
    props.mimeType.toLowerCase().startsWith('audio/') ||
    candidates.value.some((type) => isKnownFileType(type, NmorphAudioResolution))
  ) {
    return NmorphIconAudio;
  }
  if (
    props.mimeType.toLowerCase().startsWith('video/') ||
    candidates.value.some((type) => isKnownFileType(type, NmorphVideoResolution))
  ) {
    return NmorphIconVideo;
  }
  if (candidates.value.some((type) => isKnownFileType(type, NmorphArchiveResolution))) return NmorphIconArchive;
  if (candidates.value.some((type) => isKnownFileType(type, NmorphDocResolution))) return NmorphIconDoc;
  return NmorphIconDoc;
});

const formatSize = (size?: number) => {
  if (size === undefined || Number.isNaN(size) || size < 0) return '';
  if (size === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** exponent;
  const digits = value >= 10 || exponent === 0 || Number.isInteger(value) ? 0 : 1;

  return `${value.toFixed(digits)} ${units[exponent]}`;
};

const fileSize = computed(() => formatSize(props.size));
const typeLabel = computed(() => extension.value || props.mimeType);
const meta = computed(() => [typeLabel.value, fileSize.value].filter(Boolean).join(' · '));
const audioPreviewAvailable = computed(() => {
  return props.mediaPreview === 'audio' && Boolean(props.previewSrc) && !props.loading && !props.error;
});
const videoPreviewAvailable = computed(() => {
  return props.mediaPreview === 'video' && Boolean(props.previewSrc) && !props.loading && !props.error;
});
const mediaPreviewAvailable = computed(() => audioPreviewAvailable.value || videoPreviewAvailable.value);
const videoPreviewHeight = computed(() => (props.compact ? '96px' : '120px'));
const isPdf = computed(() => props.mimeType.toLowerCase() === 'application/pdf' || extension.value === 'pdf');
const pdfPreviewHref = computed(() => (isPdf.value ? props.previewSrc || props.downloadHref : ''));
const previewOnIcon = computed(
  () => props.showDefaultActions && Boolean(pdfPreviewHref.value) && !mediaPreviewAvailable.value && isPdf.value
);
const hasActions = computed(
  () =>
    Boolean(slots.actions) ||
    (props.showDefaultActions &&
      ((props.previewSrc && !mediaPreviewAvailable.value && !previewOnIcon.value) || props.downloadHref))
);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-file-card': [
      props.surface,
      props.compact && 'compact',
      props.loading && 'loading',
      props.error && 'error',
      mediaPreviewAvailable.value && 'media',
      audioPreviewAvailable.value && 'media-audio',
      videoPreviewAvailable.value && 'media-video',
      !props.iconSurface && 'icon-plain',
      !hasActions.value && 'no-actions',
    ],
  })
);

const openHandler = () => emit('open');
const downloadHandler = () => emit('download');
const errorHandler = () => emit('error');
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-file-card__icon">
      <NmorphIcon v-if="props.loading" size="medium">
        <NmorphIconLoader />
      </NmorphIcon>
      <NmorphIcon v-else size="medium">
        <component :is="icon" />
      </NmorphIcon>
      <a
        v-if="previewOnIcon && !props.loading && !props.error"
        :href="pdfPreviewHref"
        target="_blank"
        rel="noopener noreferrer"
        class="nmorph-file-card__icon-action"
        :aria-label="`Preview ${props.name}`"
        @click="openHandler"
      >
        <NmorphIcon size="small">
          <NmorphIconEye />
        </NmorphIcon>
      </a>
    </div>
    <div class="nmorph-file-card__body">
      <div class="nmorph-file-card__info">
        <span class="nmorph-file-card__name">{{ props.name }}</span>
        <span v-if="props.error && props.errorText" class="nmorph-file-card__error">{{ props.errorText }}</span>
        <span v-else-if="meta" class="nmorph-file-card__meta">{{ meta }}</span>
      </div>
      <NmorphAudioPreview
        v-if="audioPreviewAvailable"
        class="nmorph-file-card__audio-preview"
        :src="props.previewSrc"
        :name="props.name"
        surface="plain"
        embedded
        compact
        :show-icon="false"
        :show-header="false"
        :show-default-actions="false"
        @error="errorHandler"
      />
      <NmorphVideoPreview
        v-if="videoPreviewAvailable"
        class="nmorph-file-card__video-preview"
        :src="props.previewSrc"
        :name="props.name"
        :height="videoPreviewHeight"
        surface="plain"
        embedded
        compact
        :controls="false"
        :show-meta="false"
        :show-default-actions="false"
        @error="errorHandler"
      />
    </div>
    <span v-if="props.showExtensionBadge && extension" class="nmorph-file-card__badge">{{ extension }}</span>
    <div v-if="hasActions" class="nmorph-file-card__actions">
      <slot name="actions">
        <a
          v-if="props.previewSrc && !mediaPreviewAvailable && !previewOnIcon"
          :href="props.previewSrc"
          target="_blank"
          rel="noopener noreferrer"
          class="nmorph-file-card__action-link"
          :aria-label="`Open ${props.name}`"
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
          class="nmorph-file-card__action-link"
          :aria-label="`Download ${props.name}`"
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
.nmorph-file-card {
  display: flex;
  gap: var(--indentation-03);
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  min-height: 64px;
  padding: var(--indentation-03);
  color: var(--nmorph-text-color);
  background: var(--nmorph-main-color);
  border-radius: var(--default-border-radius);
  box-shadow: var(--nmorph-shadow-inset);

  .nmorph-file-card__icon {
    position: relative;
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

  .nmorph-file-card__icon-action {
    position: absolute;
    right: -4px;
    bottom: -4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 18px;
    height: 18px;
    color: var(--nmorph-accent-color);
    text-decoration: none;
    background: var(--nmorph-main-color);
    border-radius: var(--border-radius-circular);
    box-shadow: var(--nmorph-shadow-outset);

    &:hover {
      color: var(--nmorph-focus-text-color);
      background: var(--nmorph-accent-color);
    }

    .nmorph-icon {
      --color: currentColor;
    }
  }

  .nmorph-file-card__body {
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    gap: var(--indentation-01);
    min-width: 0;
  }

  .nmorph-file-card__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .nmorph-file-card__name,
  .nmorph-file-card__meta,
  .nmorph-file-card__error {
    display: block;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .nmorph-file-card__name {
    font-weight: 600;
    font-size: var(--font-size-small);
    line-height: var(--line-height-regular);
  }

  .nmorph-file-card__meta,
  .nmorph-file-card__error {
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
  }

  .nmorph-file-card__meta {
    color: var(--nmorph-semi-contrast-text-color);
  }

  .nmorph-file-card__error {
    color: var(--nmorph-error-text-color);
  }

  .nmorph-file-card__audio-preview,
  .nmorph-file-card__video-preview {
    width: 100%;
    min-width: 0;
  }

  .nmorph-file-card__badge {
    flex: 0 0 auto;
    max-width: 72px;
    padding: 2px 6px;
    overflow: hidden;
    color: var(--nmorph-accent-color);
    font-weight: 700;
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    white-space: nowrap;
    text-transform: uppercase;
    text-overflow: ellipsis;
    background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
    border-radius: var(--default-border-radius);
  }

  .nmorph-file-card__actions {
    display: flex;
    flex: 0 0 auto;
    gap: var(--indentation-01);
    align-items: center;
  }

  .nmorph-file-card__action-link {
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

  &.nmorph-file-card--compact {
    min-height: 52px;
    padding: var(--indentation-02);

    .nmorph-file-card__icon {
      width: 30px;
      height: 30px;
    }

    .nmorph-file-card__audio-preview,
    .nmorph-file-card__video-preview {
      margin-top: 0;
    }
  }

  &.nmorph-file-card--media-audio.nmorph-file-card--no-actions {
    .nmorph-file-card__body {
      padding-inline-end: var(--indentation-02);
    }
  }

  &.nmorph-file-card--error {
    outline: 1px solid var(--nmorph-error-color);
  }

  &.nmorph-file-card--soft {
    background: color-mix(in srgb, var(--nmorph-accent-color) 6%, transparent);
    box-shadow: none;
  }

  &.nmorph-file-card--plain {
    background: transparent;
    box-shadow: none;
  }

  &.nmorph-file-card--icon-plain {
    .nmorph-file-card__icon {
      background: transparent;
    }
  }
}
</style>
