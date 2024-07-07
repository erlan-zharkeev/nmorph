<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { NmorphTooltip } from '@/components';

interface INmorphProps extends Omit<INmorphCommonInputProps, 'height'> {
  modelValue?: number;
  max?: number;
  min?: number;
  step?: number;
  showTooltip?: boolean;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  modelValue: 0,
  max: 100,
  min: 0,
  step: 1,
  disabled: false,
  fill: true,
  showTooltip: true,
});

const modifiers = computed(() =>
  useModifiers({
    nmorph: [`${props.fill && 'fill'}`],
    'nmorph-slider': [`${props.disabled && 'disabled'}`],
  })
);

const thumbWidth = 40;
const thumbWidthCss = `${thumbWidth}px`;
const tooltipVisible = ref(props.showTooltip);

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void;
}>();

const thumbValue = ref(props.modelValue);

const sliderContainer = ref<NmorphDomElementType>(null);

watch(thumbValue, () => {
  emit('update:modelValue', thumbValue.value);
});

const thumbXPercentPosition = computed(() => {
  const resizeRecomputeTrigger = windowWidth.value - windowWidth.value;
  const range = props.max - props.min + resizeRecomputeTrigger;
  const basePosition = ((thumbValue.value - props.min) / range) * 100;
  const containerWidth = sliderContainer.value?.clientWidth || 0;
  const thumbPercentWidth = (thumbWidth / containerWidth) * 100;
  const halfThumbPercent = thumbPercentWidth / 2;
  let adjustedPosition = basePosition - halfThumbPercent;
  const thumb = `${Math.max(0, Math.min(100 - thumbPercentWidth, adjustedPosition))}%`;
  const tooltip = `${adjustedPosition + halfThumbPercent}%`;
  return {
    thumb,
    tooltip,
  };
});

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);
const resizeWindowHandler = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener('resize', resizeWindowHandler);
});

onUnmounted(() => {
  document.removeEventListener('mouseup', mouseUp);
  window.removeEventListener('resize', resizeWindowHandler);
});

const mouseMove = (event: MouseEvent) => {
  const rect = sliderContainer.value?.getBoundingClientRect();
  let percent = 0;
  if (rect) {
    const position = event.clientX - rect.left;
    const size = rect.width;
    percent = Math.max(0, Math.min(1, position / size));
    thumbValue.value = props.min + percent * (props.max - props.min);
  }
  thumbValue.value = Math.round(thumbValue.value / props.step) * props.step;
  thumbValue.value = Math.max(props.min, Math.min(props.max, thumbValue.value));
};

const mouseUp = () => {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
};

const mousedownHandler = () => {
  if (props.disabled) return;
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const sliderFirst = ref<NmorphDomElementType>(null);

const handleMouseEnter = () => {
  if (props.showTooltip) tooltipVisible.value = true;
};
const handleMouseLeave = () => {
  if (props.showTooltip) tooltipVisible.value = false;
};
</script>

<template>
  <div :class="modifiers">
    <div class="nmorph-slider__content">
      <div class="nmorph-slider__input-wrapper">
        <div ref="sliderContainer" class="nmorph-slider__input-container">
          <NmorphTooltip
            v-if="tooltipVisible && !props.disabled"
            :text="String(thumbValue)"
            force-show
            :force-coordinate="{ x: thumbXPercentPosition.tooltip, y: '24px' }"
            block-position
          />
          <div
            ref="sliderFirst"
            class="nmorph-slider__thumb"
            :style="{ left: thumbXPercentPosition.thumb }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @mousedown="mousedownHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-slider {
  --value-fixed-container-width: 18px;

  cursor: pointer;

  .nmorph-slider__content {
    display: flex;
    align-items: center;
  }

  .nmorph-slider__input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--value-fixed-container-width);
    border-radius: var(--default-border-radius);

    @include nmorph-inset;
  }

  .nmorph-slider__input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 24px;
  }

  .nmorph-slider__thumb {
    position: absolute;
    width: v-bind(thumbWidthCss);
    height: 20px;
    border: 0;
    border-radius: var(--default-border-radius);

    @include nmorph-outset;
  }

  .nmorph-slider__value {
    display: flex;
    justify-content: center;
    width: var(--value-fixed-container-width);
    margin-left: var(--indentation-04);
  }
}

.nmorph-slider--fill {
  width: 100%;

  .nmorph-slider__content {
    width: 100%;
  }
}

.nmorph-slider--disabled {
  @include disabled;

  .nmorph-slider__input-content {
    pointer-events: none;
  }
}
</style>
