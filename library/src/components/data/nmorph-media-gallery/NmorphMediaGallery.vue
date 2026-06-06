<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type CSSProperties } from 'vue';
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconDownload,
  NmorphIconEnlarge,
  NmorphIconEye,
  NmorphIconFullScreen,
  NmorphIconPlay,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconShrink,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
  NmorphImage,
} from '@/components';
import { createCssSizeVariables, useModifiers } from '@/utils';
import type { INmorphMediaGalleryEmit, INmorphMediaGalleryProps, NmorphMediaGalleryItem } from './types';
import NmorphPreviewPortal from '../nmorph-preview-portal/NmorphPreviewPortal.vue';

const SWIPE_THRESHOLD = 45;

const props = withDefaults(defineProps<INmorphMediaGalleryProps>(), {
  modelValue: false,
  initialIndex: 0,
  activeIndex: undefined,
  zIndex: undefined,
  height: undefined,
  previewWidth: undefined,
  previewHeight: undefined,
  showTrigger: false,
  showTriggerName: true,
  showTriggerSize: true,
  showTriggerActions: true,
  showTriggerPreviewAction: true,
  showTriggerFullscreenAction: true,
  showTriggerDownloadAction: true,
  showTriggerPlayButton: true,
  showNavigationButtons: true,
  showActionBar: true,
  showFileName: true,
  showFileSize: true,
  showFileActions: true,
  showPlaybackButton: true,
  imageFit: 'contain',
  videoFit: 'contain',
});

const emit = defineEmits<INmorphMediaGalleryEmit>();
type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitRequestFullscreen?: () => Promise<void> | void;
};

const open = ref(props.modelValue);
const currentIndex = ref(0);
const currentVideoRef = ref<HTMLVideoElement | null>(null);
const triggerVideoRefs = ref<Record<number, HTMLVideoElement | null>>({});
const pausedVideoRef = ref<HTMLVideoElement | null>(null);
const videoPlaying = ref(false);
const scaleLevel = ref(1);
const rotateLevel = ref(0);
const pointerStart = ref<{ x: number; y: number } | null>(null);

const sourceList = computed(() => props.items || []);
const multipleItems = computed(() => sourceList.value.length > 1);
const showNavigation = computed(() => props.showNavigationButtons && multipleItems.value);
const getClampedIndex = (index: number) => {
  const lastIndex = sourceList.value.length - 1;

  if (lastIndex < 0) return 0;
  if (!Number.isFinite(index)) return 0;
  if (index < 0) return 0;
  if (index > lastIndex) return lastIndex;

  return index;
};
const resolvedCurrentIndex = computed(() => getClampedIndex(currentIndex.value));
const currentItem = computed<NmorphMediaGalleryItem | undefined>(() => sourceList.value[resolvedCurrentIndex.value]);
const isImage = computed(() => currentItem.value?.kind === 'image');
const isVideo = computed(() => currentItem.value?.kind === 'video');
const videoControls = computed(() =>
  currentItem.value?.kind === 'video' ? currentItem.value.controls !== false : false
);
const videoMuted = computed(() => (currentItem.value?.kind === 'video' ? currentItem.value.muted === true : false));
const videoPlaysinline = computed(() =>
  currentItem.value?.kind === 'video' ? currentItem.value.playsinline !== false : true
);
const videoPreload = computed(() =>
  currentItem.value?.kind === 'video' ? currentItem.value.preload || 'metadata' : 'metadata'
);
const currentVideoName = computed(() =>
  currentItem.value?.kind === 'video' ? currentItem.value.name || 'video' : 'video'
);
const currentItemName = computed(() => currentItem.value?.name || '');
const currentName = computed(() => (props.showFileName ? currentItemName.value : ''));
const currentDownloadHref = computed(() => currentItem.value?.downloadHref || '');
const showVideoFullscreenAction = computed(() => props.showFileActions && isVideo.value && !videoControls.value);
const showFileActions = computed(
  () => props.showFileActions && (showVideoFullscreenAction.value || Boolean(currentDownloadHref.value))
);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-media-gallery': [
      open.value && 'opened',
      isImage.value && 'image',
      isVideo.value && 'video',
      videoPlaying.value && isVideo.value && 'video-playing',
      props.imageFit === 'cover' && isImage.value && 'image-cover',
      props.videoFit === 'cover' && isVideo.value && 'video-cover',
    ],
  })
);
const imageTransform = computed(() => `rotate(${rotateLevel.value}deg) scale(${scaleLevel.value})`);
const triggerStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-private-media-gallery-trigger-height': props.height,
  })
);
const triggerModifiers = computed(() =>
  useModifiers({
    'nmorph-media-gallery__trigger': [props.height !== undefined && 'fixed-height'],
  })
);

const formatSize = (size?: number) => {
  if (size === undefined || Number.isNaN(size) || size < 0) return '';
  if (size === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
  const value = size / 1024 ** exponent;
  const digits = value >= 10 || exponent === 0 || Number.isInteger(value) ? 0 : 1;

  return `${value.toFixed(digits)} ${units[exponent]}`;
};
const currentSize = computed(() => (props.showFileSize ? formatSize(currentItem.value?.size) : ''));
const getItemName = (item: NmorphMediaGalleryItem) => item.name || '';
const getItemLabel = (item: NmorphMediaGalleryItem, index: number) =>
  item.name || `${item.kind === 'video' ? 'Video' : 'Image'} ${index + 1}`;
const getItemSize = (item: NmorphMediaGalleryItem) => formatSize(item.size);
const getItemDownloadHref = (item: NmorphMediaGalleryItem) => item.downloadHref || '';
const showTriggerPreviewActionForItem = (item: NmorphMediaGalleryItem) =>
  props.showTriggerPreviewAction && item.kind === 'video';
const showTriggerFullscreenActionForItem = (item: NmorphMediaGalleryItem) =>
  props.showTriggerFullscreenAction && item.kind === 'video';
const showTriggerDownloadActionForItem = (item: NmorphMediaGalleryItem) =>
  props.showTriggerDownloadAction && Boolean(getItemDownloadHref(item));
const showTriggerActionsForItem = (item: NmorphMediaGalleryItem) =>
  props.showTriggerActions &&
  (showTriggerPreviewActionForItem(item) ||
    showTriggerFullscreenActionForItem(item) ||
    showTriggerDownloadActionForItem(item));
const setTriggerVideoRef = (index: number, element: unknown) => {
  triggerVideoRefs.value[index] = element instanceof HTMLVideoElement ? element : null;
};

watch(
  () => props.modelValue,
  (value) => {
    open.value = value;
  }
);

watch(
  () => props.activeIndex,
  (value) => {
    if (typeof value === 'number') currentIndex.value = getClampedIndex(value);
  },
  { immediate: true }
);

watch(
  () => [props.initialIndex, sourceList.value.length] as const,
  () => {
    if (typeof props.activeIndex === 'number') return;

    currentIndex.value = getClampedIndex(props.initialIndex);
  },
  { immediate: true }
);

watch(
  () => [currentItem.value?.kind, currentItem.value?.src, resolvedCurrentIndex.value] as const,
  () => {
    videoPlaying.value = false;
    pausedVideoRef.value = null;
  }
);

const pauseCurrentVideo = () => {
  if (!currentVideoRef.value || currentVideoRef.value === pausedVideoRef.value) return;

  currentVideoRef.value.pause();
  videoPlaying.value = false;
  pausedVideoRef.value = currentVideoRef.value;
};

const resetImageTransform = () => {
  scaleLevel.value = 1;
  rotateLevel.value = 0;
};

const setCurrentIndex = (index: number) => {
  if (!sourceList.value.length) return;

  const nextIndex = getClampedIndex(index);
  if (nextIndex === resolvedCurrentIndex.value) return;

  pauseCurrentVideo();
  videoPlaying.value = false;
  currentIndex.value = nextIndex;
  resetImageTransform();
  emit('update:active-index', nextIndex);

  const nextItem = sourceList.value[nextIndex];
  if (nextItem) emit('change', nextItem, nextIndex);
};

const previousHandler = () => {
  const length = sourceList.value.length;
  if (!length) return;

  setCurrentIndex(resolvedCurrentIndex.value === 0 ? length - 1 : resolvedCurrentIndex.value - 1);
};

const nextHandler = () => {
  const length = sourceList.value.length;
  if (!length) return;

  setCurrentIndex(resolvedCurrentIndex.value === length - 1 ? 0 : resolvedCurrentIndex.value + 1);
};

const openPreviewAt = (index: number) => {
  if (!sourceList.value.length) return;

  const nextIndex = getClampedIndex(index);

  pauseCurrentVideo();
  videoPlaying.value = false;
  currentIndex.value = nextIndex;
  resetImageTransform();
  open.value = true;
  emit('update:model-value', true);
  emit('update:active-index', nextIndex);

  const nextItem = sourceList.value[nextIndex];
  if (nextItem) emit('change', nextItem, nextIndex);
};

const closeHandler = () => {
  if (!open.value) return;

  pauseCurrentVideo();
  open.value = false;
  emit('update:model-value', false);
  emit('close');
};

const rotateRight = () => {
  rotateLevel.value = rotateLevel.value + 90;
  if (rotateLevel.value >= 360) rotateLevel.value = 0;
};

const rotateLeft = () => {
  rotateLevel.value = rotateLevel.value - 90;
  if (rotateLevel.value <= -360) rotateLevel.value = 0;
};

const zoomIn = () => {
  scaleLevel.value = parseFloat(Math.min(scaleLevel.value + 0.2, 4).toFixed(3));
};

const zoomOut = () => {
  scaleLevel.value = parseFloat(Math.max(scaleLevel.value - 0.2, 0.2).toFixed(3));
};

const toggleNormalSize = () => {
  scaleLevel.value = 1;
};

const requestVideoFullscreen = async (videoElement: FullscreenVideoElement | null) => {
  if (!videoElement) return;

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

const fullscreenHandler = async () => {
  if (!currentItem.value || currentItem.value.kind !== 'video') return;

  emit('fullscreen', currentItem.value, resolvedCurrentIndex.value);
  await requestVideoFullscreen(currentVideoRef.value as FullscreenVideoElement | null);
};

const triggerFullscreenHandler = async (item: NmorphMediaGalleryItem, index: number) => {
  if (item.kind !== 'video') return;

  emit('fullscreen', item, index);
  await requestVideoFullscreen(triggerVideoRefs.value[index] as FullscreenVideoElement | null);
};

const downloadItemHandler = (item: NmorphMediaGalleryItem, index: number) => {
  emit('download', item, index);
};

const downloadHandler = () => {
  if (!currentItem.value) return;

  downloadItemHandler(currentItem.value, resolvedCurrentIndex.value);
};

const videoPlayHandler = () => {
  videoPlaying.value = true;
  pausedVideoRef.value = null;
};

const videoPauseHandler = () => {
  videoPlaying.value = false;
};

const videoEndedHandler = () => {
  videoPlaying.value = false;
};

const videoErrorHandler = () => {
  videoPlaying.value = false;
};

const keyboardNavigationHandler = (event: KeyboardEvent) => {
  if (!open.value) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  if (event.key === 'Escape') {
    event.preventDefault();
    closeHandler();
    return;
  }

  if (!multipleItems.value) return;

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    previousHandler();
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    nextHandler();
  }
};

const addKeyboardNavigationListener = () => {
  if (typeof document === 'undefined') return;

  document.addEventListener('keydown', keyboardNavigationHandler);
};

const removeKeyboardNavigationListener = () => {
  if (typeof document === 'undefined') return;

  document.removeEventListener('keydown', keyboardNavigationHandler);
};

watch(
  open,
  (show) => {
    if (show) {
      addKeyboardNavigationListener();
      pausedVideoRef.value = null;
      currentIndex.value = getClampedIndex(
        typeof props.activeIndex === 'number' ? props.activeIndex : props.initialIndex
      );
    } else {
      pauseCurrentVideo();
      videoPlaying.value = false;
      removeKeyboardNavigationListener();
    }
  },
  { immediate: true }
);

onBeforeUnmount(removeKeyboardNavigationListener);

const pointerDownHandler = (event: PointerEvent) => {
  pointerStart.value = { x: event.clientX, y: event.clientY };
};

const pointerUpHandler = (event: PointerEvent) => {
  if (!pointerStart.value || !showNavigation.value) {
    pointerStart.value = null;
    return;
  }

  const diffX = event.clientX - pointerStart.value.x;
  const diffY = event.clientY - pointerStart.value.y;
  pointerStart.value = null;

  if (Math.abs(diffX) < SWIPE_THRESHOLD || Math.abs(diffX) < Math.abs(diffY) * 1.2) return;

  if (diffX > 0) previousHandler();
  else nextHandler();
};
</script>

<template>
  <div v-if="props.showTrigger" :class="triggerModifiers" :style="triggerStyle">
    <div
      v-for="(item, index) in sourceList"
      :key="`${item.kind}-${item.src}-${index}`"
      class="nmorph-media-gallery__trigger-item"
      :class="`nmorph-media-gallery__trigger-item--${item.kind}`"
    >
      <button
        type="button"
        class="nmorph-media-gallery__trigger-open"
        :aria-label="`Open ${getItemLabel(item, index)}`"
        @click="openPreviewAt(index)"
      >
        <NmorphImage
          v-if="item.kind === 'image'"
          :src="item.src"
          :alt="item.alt || getItemLabel(item, index)"
          :title="getItemName(item)"
          fit="cover"
          :frame-border="0"
        />
        <video
          v-else
          :ref="(element) => setTriggerVideoRef(index, element)"
          class="nmorph-media-gallery__trigger-video"
          :src="item.src"
          :poster="item.poster || undefined"
          muted
          playsinline
          preload="metadata"
          :title="getItemName(item)"
        />
        <span v-if="props.showTriggerPlayButton && item.kind === 'video'" class="nmorph-media-gallery__trigger-play">
          <NmorphIcon size="medium" color="var(--nmorph-contrast-text-color)">
            <NmorphIconPlay />
          </NmorphIcon>
        </span>
        <span v-if="props.showTriggerName && getItemName(item)" class="nmorph-media-gallery__trigger-name">
          {{ getItemName(item) }}
        </span>
        <span v-if="props.showTriggerSize && getItemSize(item)" class="nmorph-media-gallery__trigger-size">
          {{ getItemSize(item) }}
        </span>
      </button>
      <div v-if="showTriggerActionsForItem(item)" class="nmorph-media-gallery__trigger-actions">
        <button
          v-if="showTriggerPreviewActionForItem(item)"
          type="button"
          class="nmorph-media-gallery__trigger-action"
          :aria-label="`Preview ${getItemLabel(item, index)}`"
          @click.stop="openPreviewAt(index)"
        >
          <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
            <NmorphIconEye />
          </NmorphIcon>
        </button>
        <button
          v-if="showTriggerFullscreenActionForItem(item)"
          type="button"
          class="nmorph-media-gallery__trigger-action"
          :aria-label="`Fullscreen ${getItemLabel(item, index)}`"
          @click.stop="triggerFullscreenHandler(item, index)"
        >
          <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
            <NmorphIconFullScreen />
          </NmorphIcon>
        </button>
        <a
          v-if="showTriggerDownloadActionForItem(item)"
          :href="getItemDownloadHref(item)"
          :download="getItemName(item) || undefined"
          class="nmorph-media-gallery__trigger-action"
          :aria-label="`Download ${getItemLabel(item, index)}`"
          @click.stop="downloadItemHandler(item, index)"
        >
          <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
            <NmorphIconDownload />
          </NmorphIcon>
        </a>
      </div>
    </div>
  </div>
  <NmorphPreviewPortal
    v-if="open"
    :show="open"
    :z-index="props.zIndex"
    :state-class="modifiers"
    content-class="nmorph-media-gallery__content"
    left-class="nmorph-media-gallery__left"
    right-class="nmorph-media-gallery__right"
    actions-class="nmorph-media-gallery__actions"
    :content-width="props.previewWidth"
    :content-height="props.previewHeight"
    :show-navigation="showNavigation"
    :show-action-bar="props.showActionBar && currentItem?.kind === 'image'"
    @close="closeHandler"
    @previous="previousHandler"
    @next="nextHandler"
  >
    <div class="nmorph-media-gallery__stage">
      <NmorphImage
        v-if="currentItem?.kind === 'image'"
        :src="currentItem.src"
        :alt="currentItem.alt || currentItem.name || ''"
        :title="currentItem.name"
        :fit="props.imageFit"
        :frame-border="0"
        :style="{ transform: imageTransform }"
        @pointerdown="pointerDownHandler"
        @pointerup="pointerUpHandler"
      />
      <video
        v-else-if="currentItem?.kind === 'video'"
        ref="currentVideoRef"
        class="nmorph-media-gallery__video"
        :src="currentItem.src"
        :poster="currentItem.poster || undefined"
        :controls="videoControls"
        :muted="videoMuted"
        :playsinline="videoPlaysinline"
        :preload="videoPreload"
        :title="currentItem.name"
        @pointerdown="pointerDownHandler"
        @pointerup="pointerUpHandler"
        @play="videoPlayHandler"
        @pause="videoPauseHandler"
        @ended="videoEndedHandler"
        @error="videoErrorHandler"
      />
      <span v-if="currentName" class="nmorph-media-gallery__file-name">{{ currentName }}</span>
      <div v-if="showFileActions" class="nmorph-media-gallery__file-actions">
        <button
          v-if="showVideoFullscreenAction"
          type="button"
          class="nmorph-media-gallery__file-action"
          :aria-label="`Fullscreen ${currentVideoName}`"
          @click.stop="fullscreenHandler"
        >
          <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
            <NmorphIconFullScreen />
          </NmorphIcon>
        </button>
        <a
          v-if="currentDownloadHref"
          :href="currentDownloadHref"
          :download="currentItemName || undefined"
          class="nmorph-media-gallery__file-action"
          :aria-label="`Download ${currentItemName || 'media'}`"
          @click.stop="downloadHandler"
        >
          <NmorphIcon size="small" color="var(--nmorph-contrast-text-color)">
            <NmorphIconDownload />
          </NmorphIcon>
        </a>
      </div>
      <span v-if="currentSize" class="nmorph-media-gallery__file-size">{{ currentSize }}</span>
    </div>
    <template #actions>
      <div class="nmorph-media-gallery__action-element">
        <NmorphButton @click="rotateRight">
          <NmorphIcon>
            <NmorphIconRotateRight />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-media-gallery__action-element">
        <NmorphButton @click="rotateLeft">
          <NmorphIcon>
            <NmorphIconRotateLeft />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-media-gallery__action-element">
        <NmorphButton @click="zoomIn">
          <NmorphIcon>
            <NmorphIconZoomIn />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-media-gallery__action-element">
        <NmorphButton @click="zoomOut">
          <NmorphIcon>
            <NmorphIconZoomOut />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-media-gallery__action-element">
        <NmorphButton :disabled="scaleLevel === 1" @click="toggleNormalSize">
          <NmorphIcon>
            <NmorphIconEnlarge v-if="scaleLevel < 1" />
            <NmorphIconShrink v-else />
          </NmorphIcon>
        </NmorphButton>
      </div>
    </template>
  </NmorphPreviewPortal>
</template>

<style lang="scss">
.nmorph-media-gallery__trigger {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--indentation-03);
  width: 100%;
}

.nmorph-media-gallery__trigger--fixed-height {
  grid-auto-rows: var(--nmorph-private-media-gallery-trigger-height);
}

.nmorph-media-gallery__trigger-item {
  position: relative;
  min-width: 0;
  overflow: hidden;
  background: color-mix(in srgb, var(--nmorph-accent-color) 6%, transparent);
  border-radius: var(--default-border-radius);
  aspect-ratio: 16 / 9;
}

.nmorph-media-gallery__trigger--fixed-height .nmorph-media-gallery__trigger-item {
  height: 100%;
  aspect-ratio: auto;
}

.nmorph-media-gallery__trigger-open {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  color: inherit;
  font: inherit;
  text-align: initial;
  background: transparent;
  border: 0;
  cursor: pointer;

  .nmorph-image,
  .nmorph-media-gallery__trigger-video {
    display: block;
    width: 100%;
    height: 100%;
    transition: filter var(--transition-03) ease-in-out;
  }

  .nmorph-image img,
  .nmorph-media-gallery__trigger-video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    .nmorph-image,
    .nmorph-media-gallery__trigger-video {
      filter: brightness(0.86);
    }
  }
}

.nmorph-media-gallery__trigger-name,
.nmorph-media-gallery__trigger-size {
  position: absolute;
  z-index: 2;
  display: block;
  box-sizing: border-box;
  min-width: 0;
  min-height: 22px;
  padding: 0 6px;
  overflow: hidden;
  color: var(--nmorph-contrast-text-color);
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
  border-radius: var(--default-border-radius);
  pointer-events: none;
}

.nmorph-media-gallery__trigger-name {
  top: var(--indentation-02);
  left: var(--indentation-02);
  max-width: calc(100% - 56px);
  font-weight: var(--font-weight-semibold);
  font-size: var(--nmorph-typography-label-font-size);
}

.nmorph-media-gallery__trigger-item--video .nmorph-media-gallery__trigger-name {
  max-width: calc(100% - 118px);
}

.nmorph-media-gallery__trigger-size {
  right: var(--indentation-02);
  bottom: var(--indentation-02);
  max-width: calc(100% - var(--indentation-04));
  font-size: var(--nmorph-typography-caption-font-size);
}

.nmorph-media-gallery__trigger-actions {
  position: absolute;
  top: var(--indentation-02);
  right: var(--indentation-02);
  z-index: 3;
  display: flex;
  gap: var(--indentation-01);
}

.nmorph-media-gallery__trigger-action {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  padding: 0;
  color: var(--nmorph-contrast-text-color);
  font: inherit;
  line-height: 1;
  text-decoration: none;
  background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
  border: 0;
  border-radius: var(--default-border-radius);
  cursor: pointer;

  .nmorph-icon {
    flex: 0 0 auto;
    --nmorph-private-icon-color: var(--nmorph-contrast-text-color);
  }

  &:hover {
    color: var(--nmorph-contrast-text-color);
    background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
  }
}

.nmorph-media-gallery__trigger-play {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 54px;
  height: 54px;
  color: var(--nmorph-contrast-text-color);
  background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
  border-radius: var(--border-radius-circular);
  transform: translate(-50%, -50%);
  pointer-events: none;

  .nmorph-icon {
    --nmorph-private-icon-color: var(--nmorph-contrast-text-color);
  }
}

.nmorph-media-gallery {
  display: contents;

  .nmorph-media-gallery__stage {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  .nmorph-image {
    width: 100%;
    height: 100%;
    transition: transform var(--transition-03) ease-in-out;
    pointer-events: none;

    img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: contain;
      pointer-events: auto;
    }
  }

  .nmorph-media-gallery__video {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    background: var(--nmorph-black-color);
    border-radius: var(--default-border-radius);
    object-fit: contain;
    pointer-events: auto;
  }

  .nmorph-media-gallery__file-name,
  .nmorph-media-gallery__file-size {
    position: absolute;
    z-index: 2;
    display: block;
    box-sizing: border-box;
    min-width: 0;
    min-height: 22px;
    padding: 0 6px;
    overflow: hidden;
    color: var(--nmorph-contrast-text-color);
    line-height: 22px;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border-radius: var(--default-border-radius);
    pointer-events: none;
  }

  .nmorph-media-gallery__file-name {
    top: var(--indentation-02);
    left: var(--indentation-02);
    max-width: calc(100% - 56px);
    font-weight: var(--font-weight-semibold);
    font-size: var(--nmorph-typography-label-font-size);
  }

  &.nmorph-media-gallery--video .nmorph-media-gallery__file-name {
    max-width: calc(100% - 92px);
  }

  .nmorph-media-gallery__file-size {
    right: var(--indentation-02);
    bottom: var(--indentation-02);
    max-width: calc(100% - var(--indentation-04));
    font-size: var(--nmorph-typography-caption-font-size);
  }

  .nmorph-media-gallery__file-actions {
    position: absolute;
    top: var(--indentation-02);
    right: var(--indentation-02);
    z-index: 3;
    display: flex;
    gap: var(--indentation-01);
    pointer-events: auto;
  }

  .nmorph-media-gallery__file-action {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 22px;
    height: 22px;
    padding: 0;
    color: var(--nmorph-contrast-text-color);
    font: inherit;
    line-height: 1;
    text-decoration: none;
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border: 0;
    border-radius: var(--default-border-radius);
    cursor: pointer;

    .nmorph-icon {
      flex: 0 0 auto;
      --nmorph-private-icon-color: var(--nmorph-contrast-text-color);
    }

    &:hover {
      background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
    }
  }

  .nmorph-media-gallery__action-element {
    margin-right: var(--indentation-03);
  }

  &.nmorph-media-gallery--image-cover .nmorph-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &.nmorph-media-gallery--video-cover .nmorph-media-gallery__video {
    object-fit: cover;
  }
}
</style>
