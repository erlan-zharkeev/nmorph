<script setup lang="ts">
import { ComputedRef, computed, ref } from 'vue';
import { createModifiers } from './../../../utils';
import NmorphOverlay from './../nmorph-overlay/NmorphOverlay.vue';
import NmorphImage from './../nmorph-image/NmorphImage.vue';
import NmorphButton from './../nmorph-button/NmorphButton.vue';
import NmorphIcon from './../nmorph-icon/NmorphIcon.vue';
import { IconName } from '../nmorph-icon/NmorphIconList.enums';

interface IProps {
  show?: boolean;
  alt?: string;
  initialIndex?: number;
  src: string | string[];
  scaleStep?: number;
  minScaleLevel?: number;
  maxScaleLevel?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  alt: '',
  show: true,
  initialIndex: 0,
  scaleStep: 0.2,
  minScaleLevel: 0.2,
  maxScaleLevel: 4,
});

const open = ref(props.show);
const modifiers = computed(() => createModifiers('nmorph-image-preview', [open.value ? 'opened' : '']));
const elIndex = ref(props.initialIndex);
const triggerSource = computed(() => (typeof props.src === 'string' ? props.src : props.src[elIndex.value]));

const currentIndex = ref(0);
const scaleLevel = ref(1);

const decreaseIndex = () => {
  currentIndex.value = currentIndex.value - 1;
};

const increaseIndex = () => {
  currentIndex.value = currentIndex.value + 1;
};

const clickHandler = () => {
  open.value = true;
  emit('on-open');
};

const closeHandler = () => {
  open.value = false;
  emit('on-close');
};

export interface IEmit {
  (e: 'on-close'): void;
  (e: 'on-open'): void;
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

interface Action {
  icon: IconName;
  handler: () => void;
}

const enlargeShrinkActionData: ComputedRef<Action> = computed(() => {
  let result: Action = {
    icon: 'shrink',
    handler: shrinkToNormal,
  };
  if (isLevelChangedToMin.value) {
    result = {
      icon: 'enlarge',
      handler: enlargeToNormal,
    };
  }
  return result;
});

const actions: Action[] = [
  {
    icon: 'rotate-right',
    handler: rotateRight,
  },
  {
    icon: 'rotate-left',
    handler: rotateLeft,
  },
  {
    icon: 'zoom-in',
    handler: zoomIn,
  },
  {
    icon: 'zoom-out',
    handler: zoomOut,
  },
];

const emit = defineEmits<IEmit>();
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
    </NmorphOverlay>
    <div class="nmorph-image-preview__actions">
      <div v-for="(action, idx) in actions" :key="idx" class="nmorph-image-preview__action-element">
        <NmorphButton @click="action.handler">
          <NmorphIcon :name="action.icon" />
        </NmorphButton>
      </div>
      <div class="nmorph-image-preview__action-element">
        <NmorphButton :disabled="scaleLevel === 1" @click="enlargeShrinkActionData.handler">
          <NmorphIcon :name="enlargeShrinkActionData.icon" />
        </NmorphButton>
      </div>
    </div>
    <div class="nmorph-image-preview__left">
      <NmorphButton>
        <NmorphIcon name="chevron-down" />
      </NmorphButton>
    </div>
    <div class="nmorph-image-preview__right">
      <NmorphButton>
        <NmorphIcon name="chevron-down" />
      </NmorphButton>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-image-preview {
  --width: 100px;
  --height: 100px;

  overflow: hidden;
  width: var(--width);
  height: var(--height);

  .nmorph-image-preview__trigger {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
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
    display: flex;
    position: absolute;
    transform: translateX(-50%);
    bottom: -50px;
    left: 50%;
    z-index: 2;
    transition: ease-in-out bottom var(--transition-03);
  }
  .nmorph-image-preview__action-element {
    margin-right: 8px;
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
    left: 20px;
    transform: rotate(90deg) translateX(-50%);
  }
  .nmorph-image-preview__right {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: rotate(270deg) translateX(50%);
  }
}

.nmorph-image-preview--opened {
  .nmorph-image-preview__actions {
    bottom: 50px;
  }
}
</style>
