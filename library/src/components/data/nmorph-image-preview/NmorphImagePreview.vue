<script setup lang="ts">
import { useModifiers } from '@/utils';
import { ComputedRef, computed, ref, watch } from 'vue';
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

interface INmorphProps {
  modelValue?: boolean;
  alt?: string;
  initialIndex?: number;
  src: string | string[];
  scaleStep?: number;
  minScaleLevel?: number;
  maxScaleLevel?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  alt: '',
  modelValue: false,
  initialIndex: 0,
  scaleStep: 0.2,
  minScaleLevel: 0.2,
  maxScaleLevel: 4,
});

const open = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => (open.value = newValue)
);

const modifiers = computed(() =>
  useModifiers({
    'nmorph-image-preview': [`${open.value && 'opened'}`],
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

interface INmorphEmit {
  (e: 'update:model-value', value: boolean): void;
}

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

const emit = defineEmits<INmorphEmit>();

const multipleSources = computed(() => Array.isArray(props.src) && props.src.length > 0);
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-image-preview__trigger" @click="clickHandler">
      <NmorphImage :src="triggerSource" :alt="props.alt" fit="cover" />
    </div>
    <NmorphOverlay :show="open" @on-outside-click="closeHandler">
      <div class="nmorph-image-preview__content">
        <NmorphImage
          :src="triggerSource"
          :alt="props.alt"
          fit="cover"
          :style="{ transform: `rotate(${rotateLevel}deg) scale(${scaleLevel})` }"
        />
      </div>
      <div v-if="multipleSources" class="nmorph-image-preview__left">
        <NmorphButton @click="previousHandler">
          <NmorphIcon>
            <NmorphIconChevronDown />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div v-if="multipleSources" class="nmorph-image-preview__right">
        <NmorphButton @click="nextHandler">
          <NmorphIcon>
            <NmorphIconChevronDown />
          </NmorphIcon>
        </NmorphButton>
      </div>
      <div class="nmorph-image-preview__actions">
        <div v-for="(action, idx) in actions" :key="idx" class="nmorph-image-preview__action-element">
          <NmorphButton @click="action.handler">
            <NmorphIcon>
              <component :is="action.icon" />
            </NmorphIcon>
          </NmorphButton>
        </div>
        <div class="nmorph-image-preview__action-element">
          <NmorphButton :disabled="scaleLevel === 1" @click="enlargeShrinkActionData.handler">
            <NmorphIcon :name="enlargeShrinkActionData.icon">
              <component :is="enlargeShrinkActionData.icon" />
            </NmorphIcon>
          </NmorphButton>
        </div>
      </div>
    </NmorphOverlay>
  </div>
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

  .nmorph-image-preview__content {
    transition: var(--transition-04) opacity ease-in-out;

    @include absolute-center;
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
}

.nmorph-image-preview--opened {
  .nmorph-image-preview__actions {
    bottom: 50px;
  }

  $nmorph-image-preview-btn-margin: 20px;

  .nmorph-image-preview__left {
    left: $nmorph-image-preview-btn-margin;
  }

  .nmorph-image-preview__right {
    right: $nmorph-image-preview-btn-margin;
  }
}
</style>
