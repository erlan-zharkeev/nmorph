<script setup lang="ts">
import { createCssSizeVariables, useModifiers } from '@/utils';
import { ComputedRef, computed, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  NmorphImage,
  NmorphButton,
  NmorphIcon,
  NmorphOverlay,
  INmorphAction,
  NmorphIconShrink,
  NmorphIconEnlarge,
  NmorphIconRotateLeft,
  NmorphIconRotateRight,
  NmorphIconZoomIn,
  NmorphIconZoomOut,
  NmorphIconChevronDown,
} from '@/components';
import type { INmorphImagePreviewEmit, INmorphImagePreviewProps } from './types';

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
  navigationButtonMargin: undefined,
});

const open = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => (open.value = newValue)
);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-image-preview': [open.value && 'opened'],
  })
);

const currentIndex = ref(props.initialIndex);
const triggerSource = computed(() => (typeof props.src === 'string' ? props.src : props.src[currentIndex.value]));

const scaleLevel = ref(1);

const clickHandler = () => {
  open.value = true;
  emit('update:model-value', open.value);
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
  const length = props.src.length - 1;
  const value = currentIndex.value - 1;
  if (value < 0) currentIndex.value = length;
  else currentIndex.value = value;
};

const nextHandler = () => {
  const length = props.src.length - 1;
  const value = currentIndex.value + 1;
  if (value > length) currentIndex.value = 0;
  else currentIndex.value = value;
};

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

const multipleSources = computed(() => Array.isArray(props.src) && props.src.length > 0);
const showNavigation = computed(() => props.showNavigationButtons && multipleSources.value);
const triggerStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--width': props.width,
    '--height': props.height,
  })
);
const portalStyle = computed<CSSProperties>(() =>
  createCssSizeVariables({
    '--nmorph-image-preview-btn-margin': props.navigationButtonMargin,
  })
);
</script>

<template>
  <div v-if="props.showTrigger" :class="modifiers" :style="triggerStyle">
    <div class="nmorph-image-preview__trigger" @click="clickHandler">
      <NmorphImage :src="triggerSource" :alt="props.alt" fit="cover" :frame-border="0">
        <template v-if="$slots.loading" #loading>
          <slot name="loading" />
        </template>
        <template v-if="$slots.error" #error>
          <slot name="error" />
        </template>
      </NmorphImage>
    </div>
  </div>
  <Teleport v-if="open" to="body">
    <div class="nmorph-image-preview__portal" :class="modifiers" :style="portalStyle">
      <NmorphOverlay
        :show="open"
        :z-index="props.zIndex"
        disabled-teleport
        trap-focus
        @on-outside-click="closeHandler"
        @on-escape-keydown="closeHandler"
      >
        <div class="nmorph-image-preview__content">
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
        </div>
        <div v-if="showNavigation" class="nmorph-image-preview__left">
          <NmorphButton @click="previousHandler">
            <NmorphIcon>
              <NmorphIconChevronDown />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-if="showNavigation" class="nmorph-image-preview__right">
          <NmorphButton @click="nextHandler">
            <NmorphIcon>
              <NmorphIconChevronDown />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div v-if="props.showActionBar" class="nmorph-image-preview__actions">
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
        </div>
      </NmorphOverlay>
    </div>
  </Teleport>
</template>

<style lang="scss">
.nmorph-image-preview {
  --width: 50px;
  --height: 50px;

  width: var(--width);
  height: var(--height);
  overflow: hidden;

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
}

.nmorph-image-preview__portal {
  display: contents;

  .nmorph-image-preview__content {
    --nmorph-image-preview-content-width: min(calc(100vw - 96px), 960px);
    --nmorph-image-preview-content-height: min(calc(100vh - 180px), 720px);

    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--nmorph-image-preview-content-width);
    height: var(--nmorph-image-preview-content-height);
    transform: translate(-50%, -50%);
    transition: var(--transition-04) opacity ease-in-out;
    pointer-events: none;

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

  .nmorph-image-preview__actions {
    position: absolute;
    bottom: -50px;
    left: 50%;
    z-index: 2;
    display: flex;
    height: 0;
    transform: translateX(-50%);
    transition: ease-in-out bottom var(--transition-03);
  }

  .nmorph-image-preview__action-element {
    margin-right: var(--indentation-03);
  }

  .nmorph-button__content {
    box-shadow: none;
  }

  .nmorph-image-preview__left,
  .nmorph-image-preview__right {
    z-index: 2;
  }

  .nmorph-image-preview__left {
    position: absolute;
    top: 50%;
    left: -100%;
    transform: rotate(90deg) translateX(-50%);
    transition: ease-in-out left var(--transition-03);
  }

  .nmorph-image-preview__right {
    position: absolute;
    top: 50%;
    right: -100%;
    transform: rotate(270deg) translateX(50%);
    transition: ease-in-out right var(--transition-03);
  }

  &.nmorph-image-preview--opened {
    .nmorph-image-preview__actions {
      bottom: 50px;
    }

    --nmorph-image-preview-btn-margin: 20px;

    .nmorph-image-preview__left {
      left: var(--nmorph-image-preview-btn-margin);
    }

    .nmorph-image-preview__right {
      right: var(--nmorph-image-preview-btn-margin);
    }
  }
}
</style>
