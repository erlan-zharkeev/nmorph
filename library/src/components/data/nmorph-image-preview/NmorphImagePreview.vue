<script setup lang="ts">
import { createCssSizeVariables, useModifiers } from '@/utils';
import { ComputedRef, computed, onBeforeUnmount, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  NmorphImage,
  NmorphButton,
  NmorphIcon,
  INmorphAction,
  NmorphIconShrink,
  NmorphIconEnlarge,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
} from '@/components';
import type { INmorphImagePreviewEmit, INmorphImagePreviewProps } from './types';
import NmorphPreviewPortal from '../nmorph-preview-portal/NmorphPreviewPortal.vue';

const props = withDefaults(defineProps<INmorphImagePreviewProps>(), {
  alt: '',
  modelValue: false,
  initialIndex: 0,
  scaleStep: 0.2,
  minScaleLevel: 0.2,
  maxScaleLevel: 4,
  zIndex: undefined,
  showTrigger: true,
  showNavigationButtons: true,
  showActionBar: true,
  width: undefined,
  height: undefined,
  radius: undefined,
  fit: 'cover',
  navigationButtonMargin: undefined,
  triggerView: 'single',
  triggerLimit: undefined,
  triggerGap: 8,
});

const open = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => (open.value = newValue)
);

const sourceList = computed(() => (Array.isArray(props.src) ? props.src : [props.src]));
const getClampedIndex = (index: number) => {
  const lastIndex = sourceList.value.length - 1;

  if (lastIndex < 0) return 0;
  if (index < 0) return 0;
  if (index > lastIndex) return lastIndex;

  return index;
};
const currentIndex = ref(getClampedIndex(props.initialIndex));
const resolvedCurrentIndex = computed(() => getClampedIndex(currentIndex.value));
const triggerSource = computed(() => sourceList.value[resolvedCurrentIndex.value] || '');
const showGalleryTrigger = computed(() => props.triggerView === 'gallery' && sourceList.value.length > 1);
const triggerSourceLimit = computed(() => {
  if (!props.triggerLimit || props.triggerLimit < 1) return sourceList.value.length;

  return Math.min(Math.floor(props.triggerLimit), sourceList.value.length);
});
const triggerSources = computed(() =>
  sourceList.value.slice(0, triggerSourceLimit.value).map((src, index) => ({
    index,
    src,
  }))
);
const hiddenTriggerCount = computed(() => sourceList.value.length - triggerSources.value.length);
const lastVisibleTriggerIndex = computed(() => triggerSources.value[triggerSources.value.length - 1]?.index ?? -1);
const modifiers = computed(() =>
  useModifiers({
    'nmorph-image-preview': [open.value && 'opened', showGalleryTrigger.value && 'gallery-trigger'],
  })
);

const scaleLevel = ref(1);

watch(
  () => [props.initialIndex, sourceList.value.length],
  () => {
    currentIndex.value = getClampedIndex(props.initialIndex);
  }
);

const openPreviewAt = (index: number) => {
  currentIndex.value = getClampedIndex(index);
  open.value = true;
  emit('update:model-value', open.value);
};

const clickHandler = () => {
  if (showGalleryTrigger.value) return;

  openPreviewAt(resolvedCurrentIndex.value);
};

const closeHandler = () => {
  open.value = false;
  emit('update:model-value', open.value);
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
  if (scaleLevel.value < props.maxScaleLevel) {
    scaleLevel.value += props.scaleStep;
  }
  scaleLevel.value = parseFloat(scaleLevel.value.toFixed(3));
};

const zoomOut = () => {
  if (scaleLevel.value > props.minScaleLevel) {
    scaleLevel.value -= props.scaleStep;
  }
  scaleLevel.value = parseFloat(scaleLevel.value.toFixed(3));
};

const isLevelChangedToMin = computed(() => scaleLevel.value < 1);

const enlargeToNormal = () => {
  scaleLevel.value = 1;
};

const shrinkToNormal = () => {
  scaleLevel.value = 1;
};

const rotateLevel = ref(0);

const previousHandler = () => {
  const length = sourceList.value.length;

  if (!length) return;

  const value = resolvedCurrentIndex.value - 1;
  currentIndex.value = value < 0 ? length - 1 : value;
};

const nextHandler = () => {
  const length = sourceList.value.length;

  if (!length) return;

  const value = resolvedCurrentIndex.value + 1;
  currentIndex.value = value > length - 1 ? 0 : value;
};

const keyboardNavigationHandler = (event: KeyboardEvent) => {
  if (!open.value || sourceList.value.length < 2) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

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
    } else {
      removeKeyboardNavigationListener();
    }
  },
  { immediate: true }
);

onBeforeUnmount(removeKeyboardNavigationListener);

const enlargeShrinkActionData: ComputedRef<INmorphAction> = computed(() => {
  let result: INmorphAction = {
    icon: NmorphIconShrink,
    handler: shrinkToNormal,
  };
  if (isLevelChangedToMin.value) {
    result = {
      icon: NmorphIconEnlarge,
      handler: enlargeToNormal,
    };
  }
  return result;
});

const actions: INmorphAction[] = [
  {
    icon: NmorphIconRotateRight,
    handler: rotateRight,
  },
  {
    icon: NmorphIconRotateLeft,
    handler: rotateLeft,
  },
  {
    icon: NmorphIconZoomIn,
    handler: zoomIn,
  },
  {
    icon: NmorphIconZoomOut,
    handler: zoomOut,
  },
];

const emit = defineEmits<INmorphImagePreviewEmit>();

const multipleSources = computed(() => sourceList.value.length > 1);
const showNavigation = computed(() => props.showNavigationButtons && multipleSources.value);
const triggerStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--width': props.width,
    '--height': props.height,
    '--nmorph-image-preview-radius': props.radius,
    '--nmorph-image-preview-trigger-gap': props.triggerGap,
  })
);
const getTriggerLabel = (index: number) => (props.alt ? `${props.alt} ${index + 1}` : `Image ${index + 1}`);
</script>

<template>
  <div v-if="props.showTrigger" :class="modifiers" :style="triggerStyle">
    <div class="nmorph-image-preview__trigger" @click="clickHandler">
      <template v-if="showGalleryTrigger">
        <button
          v-for="source in triggerSources"
          :key="`${source.src}-${source.index}`"
          type="button"
          class="nmorph-image-preview__trigger-item"
          :aria-label="getTriggerLabel(source.index)"
          @click.stop="openPreviewAt(source.index)"
        >
          <NmorphImage :src="source.src" :alt="getTriggerLabel(source.index)" :fit="props.fit" :frame-border="0">
            <template v-if="$slots.loading" #loading>
              <slot name="loading" />
            </template>
            <template v-if="$slots.error" #error>
              <slot name="error" />
            </template>
          </NmorphImage>
          <span
            v-if="source.index === lastVisibleTriggerIndex && hiddenTriggerCount > 0"
            class="nmorph-image-preview__trigger-more"
          >
            +{{ hiddenTriggerCount }}
          </span>
        </button>
      </template>
      <NmorphImage v-else :src="triggerSource" :alt="props.alt" :fit="props.fit" :frame-border="0">
        <template v-if="$slots.loading" #loading>
          <slot name="loading" />
        </template>
        <template v-if="$slots.error" #error>
          <slot name="error" />
        </template>
      </NmorphImage>
    </div>
  </div>
  <NmorphPreviewPortal
    v-if="open"
    :show="open"
    :z-index="props.zIndex"
    root-class="nmorph-image-preview__portal"
    :state-class="modifiers"
    content-class="nmorph-image-preview__content"
    left-class="nmorph-image-preview__left"
    right-class="nmorph-image-preview__right"
    actions-class="nmorph-image-preview__actions"
    :navigation-button-margin="props.navigationButtonMargin"
    :show-navigation="showNavigation"
    :show-action-bar="props.showActionBar"
    @close="closeHandler"
    @previous="previousHandler"
    @next="nextHandler"
  >
    <NmorphImage
      :src="triggerSource"
      :alt="props.alt"
      fit="contain"
      :frame-border="0"
      :style="{ transform: `rotate(${rotateLevel}deg) scale(${scaleLevel})` }"
    >
      <template v-if="$slots.loading" #loading>
        <slot name="loading" />
      </template>
      <template v-if="$slots.error" #error>
        <slot name="error" />
      </template>
    </NmorphImage>
    <template #actions>
      <div v-for="(action, idx) in actions" :key="idx" class="nmorph-image-preview__action-element">
        <NmorphButton @click="action.handler">
          <NmorphIcon>
            <component :is="action.icon" />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-image-preview__action-element">
        <NmorphButton :disabled="scaleLevel === 1" @click="enlargeShrinkActionData.handler">
          <NmorphIcon>
            <component :is="enlargeShrinkActionData.icon" />
          </NmorphIcon>
        </NmorphButton>
      </div>
    </template>
  </NmorphPreviewPortal>
</template>

<style lang="scss">
.nmorph-image-preview {
  --width: 50px;
  --height: 50px;
  --nmorph-image-preview-radius: var(--default-border-radius);

  width: var(--width);
  height: var(--height);
  overflow: hidden;
  border-radius: var(--nmorph-image-preview-radius);

  .nmorph-image-preview__trigger {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;

    &:hover {
      filter: brightness(0.8);
    }

    .nmorph-image {
      width: 100%;
      height: 100%;
    }
  }

  &.nmorph-image-preview--gallery-trigger {
    width: auto;
    height: auto;
    overflow: visible;

    .nmorph-image-preview__trigger {
      display: flex;
      flex-wrap: wrap;
      gap: var(--nmorph-image-preview-trigger-gap, 8px);
      width: auto;
      height: auto;

      &:hover {
        filter: none;
      }
    }

    .nmorph-image-preview__trigger-item {
      position: relative;
      display: block;
      width: var(--width);
      height: var(--height);
      padding: 0;
      overflow: hidden;
      color: inherit;
      font: inherit;
      background: transparent;
      border: 0;
      border-radius: var(--nmorph-image-preview-radius);
      cursor: pointer;

      &:hover {
        filter: brightness(0.8);
      }

      .nmorph-image {
        width: 100%;
        height: 100%;
      }
    }

    .nmorph-image-preview__trigger-more {
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--nmorph-white-color);
      font-weight: 600;
      line-height: var(--line-height-regular);
      background: color-mix(in srgb, var(--nmorph-black-color) 60%, transparent);
      pointer-events: none;
    }
  }
}

.nmorph-image-preview__portal {
  display: contents;

  .nmorph-image-preview__content {
    .nmorph-image {
      width: 100%;
      height: 100%;
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
  }

  .nmorph-image-preview__action-element {
    margin-right: var(--indentation-03);
  }
}
</style>
