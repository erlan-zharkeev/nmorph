<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import {
  NmorphButton,
  NmorphIcon,
  NmorphIconEnlarge,
  NmorphIconPause,
  NmorphIconPlay,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconShrink,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
  NmorphImage,
} from '@/components';
import { useModifiers } from '@/utils';
import type { INmorphMediaGalleryEmit, INmorphMediaGalleryProps, NmorphMediaGalleryItem } from './types';
import NmorphPreviewPortal from '../nmorph-preview-portal/NmorphPreviewPortal.vue';

const SWIPE_THRESHOLD = 45;

const props = withDefaults(defineProps<INmorphMediaGalleryProps>(), {
  modelValue: false,
  initialIndex: 0,
  activeIndex: undefined,
  zIndex: undefined,
  showNavigationButtons: true,
  showActionBar: true,
  imageFit: 'contain',
  videoFit: 'contain',
});

const emit = defineEmits<INmorphMediaGalleryEmit>();
const open = ref(props.modelValue);
const currentIndex = ref(0);
const currentVideoRef = ref<HTMLVideoElement | null>(null);
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

const toggleVideoPlayback = async () => {
  if (!currentVideoRef.value) return;

  if (videoPlaying.value) {
    currentVideoRef.value.pause();
    return;
  }

  try {
    await currentVideoRef.value.play();
  } catch {
    videoPlaying.value = false;
  }
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
  <NmorphPreviewPortal
    v-if="open"
    :show="open"
    :z-index="props.zIndex"
    :state-class="modifiers"
    content-class="nmorph-media-gallery__content"
    left-class="nmorph-media-gallery__left"
    right-class="nmorph-media-gallery__right"
    actions-class="nmorph-media-gallery__actions"
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
      <button
        v-if="currentItem?.kind === 'video'"
        class="nmorph-media-gallery__play"
        type="button"
        :aria-label="videoPlaying ? `Pause ${currentVideoName}` : `Play ${currentVideoName}`"
        @click.stop="toggleVideoPlayback"
      >
        <NmorphIcon size="medium" color="var(--nmorph-contrast-text-color)">
          <NmorphIconPause v-if="videoPlaying" />
          <NmorphIconPlay v-else />
        </NmorphIcon>
      </button>
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

  .nmorph-media-gallery__play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 54px;
    height: 54px;
    padding: 0;
    color: var(--nmorph-contrast-text-color);
    background: color-mix(in srgb, var(--nmorph-black-color) 58%, transparent);
    border: 0;
    border-radius: var(--border-radius-circular);
    transform: translate(-50%, -50%);
    cursor: pointer;
    pointer-events: auto;

    .nmorph-icon {
      --nmorph-icon-color: var(--nmorph-contrast-text-color);
      --color: var(--nmorph-contrast-text-color);
    }

    &:hover {
      background: color-mix(in srgb, var(--nmorph-black-color) 72%, transparent);
    }
  }

  &.nmorph-media-gallery--video-playing .nmorph-media-gallery__play {
    opacity: 0.72;
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
