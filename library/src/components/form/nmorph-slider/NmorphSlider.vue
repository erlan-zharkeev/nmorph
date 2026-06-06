<script setup lang="ts">
import { NmorphDomElementType } from '@/types';
import { createCssSizeVariables, useModifiers } from '@/utils';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { NmorphTooltip } from '@/components';
import { useFormItemInput, useFormItemModel } from '../nmorph-form/use-form-item-input';
import type { INmorphSliderEmit, INmorphSliderProps } from './types';

const props = withDefaults(defineProps<INmorphSliderProps>(), {
  modelValue: 0,
  max: 100,
  min: 0,
  step: 1,
  disabled: false,
  fill: true,
  showTooltip: true,
  thumbWidth: 50,
  sliderHeight: undefined,
  valueFixedContainerHeight: undefined,
});

const { id, name, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-slider': [props.disabled && 'disabled'],
  })
);

const thumbWidthCss = computed(() => `${props.thumbWidth}px`);
const tooltipVisible = ref(props.showTooltip);

const emit = defineEmits<INmorphSliderEmit>();
const { modelValue, updateModelValue } = useFormItemModel<number>(
  props,
  (value) => emit('update:model-value', value),
  0
);

const thumbValue = ref(modelValue.value);

const sliderContainer = ref<NmorphDomElementType>(null);

watch(thumbValue, () => {
  updateModelValue(thumbValue.value);
});

watch(modelValue, (updatedValue) => {
  thumbValue.value = updatedValue;
});

const tooltipRootRef = ref<InstanceType<typeof NmorphTooltip> | null>(null);
const tooltipWidth = ref(24);

const updateTooltipWidth = () => {
  tooltipWidth.value = tooltipRootRef.value?.tooltipBody?.clientWidth || 24;
};

watch([thumbValue, tooltipVisible], () => nextTick(updateTooltipWidth), { flush: 'post' });

const thumbXPercentPosition = computed(() => {
  windowWidth.value;
  windowHeight.value;
  const range = props.max - props.min;
  const containerWidth = sliderContainer.value?.clientWidth || 0;

  if (!containerWidth || range <= 0) return { thumb: '0px', tooltip: '0px' };

  const progress = Math.max(0, Math.min(1, (thumbValue.value - props.min) / range));
  const thumbWidth = Math.min(props.thumbWidth, containerWidth);
  const thumbLeft = progress * Math.max(0, containerWidth - thumbWidth);
  const thumbCenter = thumbLeft + thumbWidth / 2;
  const maxTooltipLeft = Math.max(0, containerWidth - tooltipWidth.value);
  const tooltipLeft = Math.max(0, Math.min(maxTooltipLeft, thumbCenter - tooltipWidth.value / 2));

  const thumb = `${thumbLeft}px`;
  const tooltip = `${tooltipLeft}px`;
  return {
    thumb,
    tooltip,
  };
});

const windowWidth = ref(0);
const windowHeight = ref(0);
const resizeWindowHandler = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
  nextTick(updateTooltipWidth);
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
    window.addEventListener('resize', resizeWindowHandler);
    nextTick(updateTooltipWidth);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('pointermove', pointerMove);
    document.removeEventListener('pointerup', pointerUp);
    document.removeEventListener('pointercancel', pointerUp);
    window.removeEventListener('resize', resizeWindowHandler);
  }
});

const updateThumbValue = (clientX: number) => {
  transitionEnabled.value = false;
  const rect = sliderContainer.value?.getBoundingClientRect();
  let percent = 0;
  if (rect) {
    const position = clientX - rect.left;
    const size = rect.width;
    percent = Math.max(0, Math.min(1, position / size));
    thumbValue.value = props.min + percent * (props.max - props.min);
  }
  thumbValue.value = Math.round(thumbValue.value / props.step) * props.step;
  thumbValue.value = Math.max(props.min, Math.min(props.max, thumbValue.value));
};

const pointerMove = (event: PointerEvent) => {
  event.preventDefault();
  updateThumbValue(event.clientX);
};

const pointerUp = () => {
  document.removeEventListener('pointermove', pointerMove);
  document.removeEventListener('pointerup', pointerUp);
  document.removeEventListener('pointercancel', pointerUp);
  transitionEnabled.value = true;
};

const pointerDownHandler = (event: PointerEvent) => {
  if (props.disabled) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  event.preventDefault();
  updateThumbValue(event.clientX);
  document.addEventListener('pointermove', pointerMove);
  document.addEventListener('pointerup', pointerUp);
  document.addEventListener('pointercancel', pointerUp);
};

const sliderFirst = ref<NmorphDomElementType>(null);

const handleMouseEnter = () => {
  if (props.showTooltip) tooltipVisible.value = true;
};
const handleMouseLeave = () => {
  if (props.showTooltip) tooltipVisible.value = false;
};

const nativeInputHandler = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  thumbValue.value = Number(target.value);
};

const transitionEnabled = ref(true);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-private-slider-thumb-width': thumbWidthCss.value,
  ...createCssSizeVariables({
    '--nmorph-private-slider-height': props.sliderHeight,
    '--nmorph-private-slider-value-container-height': props.valueFixedContainerHeight,
  }),
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div class="nmorph-slider__content">
      <div class="nmorph-slider__input-wrapper">
        <div ref="sliderContainer" class="nmorph-slider__input-container" @pointerdown="pointerDownHandler">
          <NmorphTooltip
            v-if="tooltipVisible && !props.disabled"
            ref="tooltipRootRef"
            :text="String(thumbValue)"
            force-show
            :force-coordinate="{ x: thumbXPercentPosition.tooltip, y: '24px' }"
            block-position
          />
          <div
            ref="sliderFirst"
            class="nmorph-slider__thumb"
            :style="{ left: thumbXPercentPosition.thumb }"
            :class="{ 'nmorph-slider__thumb--smooth': transitionEnabled }"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
          />
          <input
            :id="id"
            :name="name"
            :tabindex="tabindex"
            class="nmorph-slide__native-input"
            type="range"
            :value="thumbValue"
            :min="props.min"
            :max="props.max"
            :step="props.step"
            :disabled="props.disabled"
            @input="nativeInputHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-slider {
  position: relative;
  width: 100%;
  height: 20px;

  --nmorph-private-slider-height: 24px;
  --nmorph-private-slider-value-container-height: 18px;

  cursor: pointer;

  .nmorph-slider__content {
    display: flex;
    align-items: center;
  }

  .nmorph-slider__input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--nmorph-private-slider-value-container-height);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-slider__input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--nmorph-private-slider-height);
    touch-action: none;
  }

  .nmorph-tooltip {
    position: absolute;
    inset: 0;
    z-index: 2;
    width: 100%;
    pointer-events: none;

    .nmorph-tooltip__content {
      width: 100%;
      height: 100%;
    }

    .nmorph-tooltip__trigger {
      display: none;
    }
  }

  .nmorph-slider__thumb {
    position: absolute;
    z-index: 1;
    width: var(--nmorph-private-slider-thumb-width);
    height: 20px;
    background: var(--nmorph-main-color);
    border: 0;
    border-radius: var(--default-border-radius);
    box-shadow:
      var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);
  }

  .nmorph-slider__thumb--smooth {
    transition: left ease-in-out 0.2s;
  }

  .nmorph-slide__native-input {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    background: transparent;
    transform: translate(-50%, -50%);
    appearance: none;
  }

  .nmorph-slide__native-input::-webkit-slider-runnable-track {
    height: var(--nmorph-private-slider-height);
    background: transparent;
  }

  .nmorph-slide__native-input::-moz-range-track {
    height: var(--nmorph-private-slider-height);
    background: transparent;
  }

  .nmorph-slide__native-input::-webkit-slider-thumb {
    visibility: hidden;
  }

  .nmorph-slide__native-input::-moz-range-thumb {
    visibility: hidden;
  }

  &.nmorph-slider--fill {
    width: 100%;

    .nmorph-slider__content {
      width: 100%;
    }
  }

  &.nmorph-slider--disabled {
    cursor: not-allowed;
    opacity: 0.6;

    .nmorph-slider__input-content {
      pointer-events: none;
    }
  }
}
</style>
