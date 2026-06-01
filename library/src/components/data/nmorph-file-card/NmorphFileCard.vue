<script setup lang="ts">
import { computed, ref, useSlots, type Component } from 'vue';
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
import NmorphMediaGallery from '../nmorph-media-gallery/NmorphMediaGallery.vue';
import NmorphVideoPreview from '../nmorph-video-preview/NmorphVideoPreview.vue';
import type { NmorphMediaGalleryItem } from '../nmorph-media-gallery/types';
import type { INmorphFileCardEmit, INmorphFileCardProps } from './types';

const CONTRAST_ICON_COLOR = 'var(--nmorph-contrast-text-color)';

const props = withDefaults(defineProps<INmorphFileCardProps>(), {
  extension: '',
  mimeType: '',
  size: undefined,
  previewSrc: '',
  downloadHref: '',
  mediaPreview: 'none',
  previewMode: 'internal',
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
const previewOpen = ref(false);

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
const imagePreviewAvailable = computed(() => {
  return props.mediaPreview === 'image' && Boolean(props.previewSrc) && !props.loading && !props.error;
});
const mediaPreviewAvailable = computed(
  () => audioPreviewAvailable.value || videoPreviewAvailable.value || imagePreviewAvailable.value
);
const visualMediaPreviewAvailable = computed(() => videoPreviewAvailable.value || imagePreviewAvailable.value);
const videoPreviewHeight = computed(() => (props.compact ? '96px' : '120px'));
const mediaGalleryItems = computed<NmorphMediaGalleryItem[]>(() => {
  if (!props.previewSrc || props.loading || props.error) return [];

  if (imagePreviewAvailable.value) {
    return [
      {
        kind: 'image',
        src: props.previewSrc,
        name: props.name,
        alt: props.name,
        size: props.size,
        downloadHref: props.downloadHref,
      },
    ];
  }

  if (videoPreviewAvailable.value) {
    return [
      {
        kind: 'video',
        src: props.previewSrc,
        name: props.name,
        size: props.size,
        downloadHref: props.downloadHref,
        controls: true,
        playsinline: true,
        preload: 'metadata',
      },
    ];
  }

  return [];
});
const shouldOpenInternalPreview = computed(
  () => props.previewMode === 'internal' && mediaGalleryItems.value.length > 0
);
const isPdf = computed(() => props.mimeType.toLowerCase() === 'application/pdf' || extension.value === 'pdf');
const pdfPreviewHref = computed(() => (isPdf.value ? props.previewSrc || props.downloadHref : ''));
const previewOnIcon = computed(
  () => props.showDefaultActions && Boolean(pdfPreviewHref.value) && !mediaPreviewAvailable.value && isPdf.value
);
const hasActions = computed(
  () =>
    Boolean(slots.actions) ||
    (props.showDefaultActions &&
      (props.loading ||
        (props.previewSrc && !mediaPreviewAvailable.value && !previewOnIcon.value) ||
        props.downloadHref))
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
      imagePreviewAvailable.value && 'media-image',
      visualMediaPreviewAvailable.value && 'media-visual',
      !props.iconSurface && 'icon-plain',
      !hasActions.value && 'no-actions',
    ],
  })
);

const openHandler = () => {
  if (shouldOpenInternalPreview.value) previewOpen.value = true;
  if (props.previewMode !== 'none') emit('open');
};
const downloadHandler = () => emit('download');
const errorHandler = () => emit('error');
</script>

<template>
  <div :class="modifiers">
    <div v-if="!visualMediaPreviewAvailable" class="nmorph-file-card__icon">
      <NmorphIcon size="medium">
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
        <NmorphIcon size="small" :color="CONTRAST_ICON_COLOR">
          <NmorphIconEye />
        </NmorphIcon>
      </a>
    </div>
    <div class="nmorph-file-card__body">
      <div class="nmorph-file-card__info" :title="props.name">
        <span class="nmorph-file-card__name">{{ props.name }}</span>
        <template v-if="!visualMediaPreviewAvailable">
          <span v-if="props.error && props.errorText" class="nmorph-file-card__error">{{ props.errorText }}</span>
          <span v-else-if="meta" class="nmorph-file-card__meta">{{ meta }}</span>
        </template>
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
        :show-preview-action="props.previewMode !== 'none'"
        preview-mode="emit"
        @error="errorHandler"
        @preview="openHandler"
      />
      <button
        v-if="imagePreviewAvailable"
        class="nmorph-file-card__image-preview"
        type="button"
        :title="props.name"
        :aria-label="`Preview ${props.name}`"
        @click="openHandler"
      >
        <img class="nmorph-file-card__image" :src="props.previewSrc" :alt="props.name" />
      </button>
    </div>
    <span v-if="visualMediaPreviewAvailable && fileSize" class="nmorph-file-card__visual-size">{{ fileSize }}</span>
    <span v-if="props.showExtensionBadge && extension && !visualMediaPreviewAvailable" class="nmorph-file-card__badge">
      {{ extension }}
    </span>
    <div v-if="hasActions" class="nmorph-file-card__actions">
      <slot name="actions">
        <span
          v-if="props.loading"
          class="nmorph-file-card__action-loader"
          role="status"
          :aria-label="`Uploading ${props.name}`"
        >
          <NmorphIcon size="small">
            <NmorphIconLoader />
          </NmorphIcon>
        </span>
        <a
          v-else-if="props.previewSrc && !mediaPreviewAvailable && !previewOnIcon"
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
          v-if="!props.loading && props.downloadHref"
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
  <NmorphMediaGallery
    v-if="mediaGalleryItems.length > 0"
    v-model="previewOpen"
    :items="mediaGalleryItems"
    :show-navigation-buttons="false"
    @download="downloadHandler"
  />
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
    color: var(--nmorph-text-color);
    background: color-mix(in srgb, var(--nmorph-text-color) 10%, transparent);
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
    color: var(--nmorph-contrast-text-color);
    text-decoration: none;
    background: color-mix(in srgb, var(--nmorph-black-color) 36%, transparent);
    border-radius: var(--border-radius-circular);
    box-shadow: var(--nmorph-shadow-outset);

    &:hover {
      background: color-mix(in srgb, var(--nmorph-black-color) 48%, transparent);
    }

    .nmorph-icon {
      --nmorph-icon-color: var(--nmorph-contrast-text-color);
      --color: var(--nmorph-contrast-text-color);
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
  .nmorph-file-card__video-preview,
  .nmorph-file-card__image-preview {
    width: 100%;
    min-width: 0;
  }

  .nmorph-file-card__image-preview {
    display: block;
    height: 120px;
    padding: 0;
    overflow: hidden;
    color: inherit;
    font: inherit;
    background: transparent;
    border: 0;
    border-radius: var(--default-border-radius);
    cursor: pointer;

    .nmorph-file-card__image {
      display: block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

  .nmorph-file-card__visual-size {
    position: absolute;
    right: var(--indentation-02);
    bottom: var(--indentation-02);
    z-index: 2;
    display: inline-flex;
    align-items: center;
    min-width: 0;
    max-width: calc(100% - var(--indentation-04));
    min-height: 22px;
    padding: 0 6px;
    overflow: hidden;
    color: var(--nmorph-contrast-text-color);
    font-size: var(--font-size-extra-small);
    line-height: var(--line-height-regular);
    white-space: nowrap;
    text-overflow: ellipsis;
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border-radius: var(--default-border-radius);
    pointer-events: none;
  }

  .nmorph-file-card__actions {
    display: flex;
    flex: 0 0 auto;
    gap: var(--indentation-01);
    align-items: center;
  }

  .nmorph-file-card__action-link,
  .nmorph-file-card__action-loader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    padding: 0;
    color: inherit;
    line-height: 1;
    text-decoration: none;
    border-radius: var(--default-border-radius);
  }

  .nmorph-file-card__action-link {
    &:hover {
      color: var(--nmorph-accent-color);
      background: color-mix(in srgb, var(--nmorph-accent-color) 10%, transparent);
    }

    .nmorph-icon {
      --color: currentColor;
    }
  }

  .nmorph-file-card__action-loader {
    color: var(--nmorph-semi-contrast-text-color);

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

    .nmorph-file-card__image-preview {
      height: 96px;
      margin-top: 0;
    }
  }

  &.nmorph-file-card--media-audio.nmorph-file-card--no-actions {
    .nmorph-file-card__body {
      padding-inline-end: var(--indentation-02);
    }
  }

  &.nmorph-file-card--media-visual {
    position: relative;
    display: block;
    gap: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;

    .nmorph-file-card__body {
      position: relative;
      display: block;
      width: 100%;
      min-width: 0;
    }

    .nmorph-file-card__info {
      position: absolute;
      top: var(--indentation-02);
      left: var(--indentation-02);
      z-index: 2;
      max-width: calc(100% - 48px);
      pointer-events: none;
    }

    .nmorph-file-card__name {
      display: block;
      min-height: 22px;
      padding: 0 6px;
      overflow: hidden;
      color: var(--nmorph-contrast-text-color);
      line-height: 22px;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
      border-radius: var(--default-border-radius);
    }

    .nmorph-file-card__image-preview,
    .nmorph-file-card__video-preview,
    .nmorph-video-preview,
    .nmorph-video-preview__media,
    .nmorph-file-card__image {
      display: block;
      width: 100%;
      max-width: none;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }

    .nmorph-file-card__actions {
      position: absolute;
      top: var(--indentation-02);
      right: var(--indentation-02);
      z-index: 3;
    }

    .nmorph-file-card__action-link,
    .nmorph-file-card__action-loader {
      color: var(--nmorph-contrast-text-color);
      background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
      border: 0;

      .nmorph-icon {
        flex: 0 0 auto;
        --nmorph-icon-color: var(--nmorph-contrast-text-color);
        --color: var(--nmorph-contrast-text-color);
      }
    }

    .nmorph-file-card__action-link:hover {
      color: var(--nmorph-contrast-text-color);
      background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
    }
  }

  &.nmorph-file-card--media-video {
    .nmorph-file-card__info {
      max-width: calc(100% - 112px);
    }

    .nmorph-video-preview__actions {
      right: calc(var(--indentation-02) + 26px);
    }
  }

  &.nmorph-file-card--media-image {
    .nmorph-file-card__image-preview {
      border-radius: inherit;
    }
  }

  &.nmorph-file-card--error {
    outline: 1px solid var(--nmorph-error-color);
  }

  &.nmorph-file-card--soft {
    background: color-mix(in srgb, var(--nmorph-accent-color) 6%, transparent);
    box-shadow: none;

    .nmorph-file-card__icon-action {
      box-shadow: none;
    }
  }

  &.nmorph-file-card--plain {
    background: transparent;
    box-shadow: none;

    .nmorph-file-card__icon-action {
      box-shadow: none;
    }
  }

  &.nmorph-file-card--icon-plain {
    .nmorph-file-card__icon {
      background: transparent;
    }
  }
}
</style>
