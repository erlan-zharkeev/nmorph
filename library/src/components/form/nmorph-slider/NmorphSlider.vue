<script setup lang="ts">
import { INmorphCommonInputProps, NmorphDomElementType } from '@/types';
import { disabled, nmorphInset, nmorphOutset, useModifiers } from '@/utils';
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { NmorphTooltip } from '@/components';
import { styled, css } from '@vue-styled-components/core'
import { useFormItemInput } from '../nmorph-form/use-form-item-input';

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

const { id, name, tabindex } = useFormItemInput(props);

const modifiers = computed(() =>
  useModifiers({
    nmorph: [],
    'nmorph-slider': [`${props.disabled && 'disabled'}`],
  })
);

const thumbWidth = 50;
const thumbWidthCss = `${thumbWidth}px`;
const tooltipVisible = ref(props.showTooltip);

const emit = defineEmits<{
  (e: 'update:model-value', val: number): void;
}>();

const thumbValue = ref(props.modelValue);

const sliderContainer = ref<NmorphDomElementType>(null);

watch(thumbValue, () => {
  emit('update:model-value', thumbValue.value);
});

watch(
  () => props.modelValue,
  (updatedValue) => {
    thumbValue.value = updatedValue;
  }
);

const tooltipRootRef = ref<InstanceType<typeof NmorphTooltip> | null>(null);

const thumbXPercentPosition = computed(() => {
  const resizeRecomputeTrigger = windowWidth.value - windowWidth.value;
  const range = props.max - props.min + resizeRecomputeTrigger;
  const basePosition = ((thumbValue.value - props.min) / range) * 100;
  const containerWidth = sliderContainer.value?.clientWidth || 0;
  const thumbPercentWidth = (thumbWidth / containerWidth) * 100;
  const halfThumbPercent = thumbPercentWidth / 2;
  let adjustedPosition = basePosition - halfThumbPercent;
  const thumbPosition = Math.max(0, Math.min(100 - thumbPercentWidth, adjustedPosition));
  const thumb = `${thumbPosition}%`;

  const onePercentInPx = containerWidth / 100;
  const halfThumbInPx = thumbWidth / 2;
  const tooltipOffsetInPercent = halfThumbInPx / onePercentInPx;

  const selfWidthInPx = tooltipRootRef.value?.tooltipBody.clientWidth ?? 24;
  const halfSelfOffsetInPx = selfWidthInPx / 2;

  const selfOffsetCandidate = halfSelfOffsetInPx / onePercentInPx;
  const selfOffsetInPercent = selfOffsetCandidate === Infinity ? 1.714 : selfOffsetCandidate;

  const tooltip = `${parseFloat(thumb) + tooltipOffsetInPercent - selfOffsetInPercent}%`;
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
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
    window.addEventListener('resize', resizeWindowHandler);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('resize', resizeWindowHandler);
  }
});

const mouseMove = (event: MouseEvent) => {
  transitionEnabled.value = false;
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
  transitionEnabled.value = true;
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

const nativeInputHandler = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  thumbValue.value = Number(target.value);
};

const transitionEnabled = ref(true);

const commonCSS = css`

  position: relative;
  width: 100%;
  height: 20px;

  --slider-height: 24px;
  --value-fixed-container-height: 18px;

  cursor: pointer;

  .nmorph-slider__content {
    display: flex;
    align-items: center;
  }

  .nmorph-slider__input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--value-fixed-container-height);
    border-radius: var(--default-border-radius);
    ${nmorphInset()}
  }

  .nmorph-slider__input-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--slider-height);
  }

  .nmorph-slider__thumb {
    position: absolute;
    z-index: 1;
    border: 0;
    border-radius: var(--default-border-radius);
    height: 20px;

    ${nmorphOutset()}
  }

  .nmorph-slider__thumb--smooth {
    transition: left ease-in-out 0.2s;
  }

  .nmorph-slider__value {
    display: flex;
    justify-content: center;
    width: var(--value-fixed-container-width);
    margin-left: var(--indentation-04);
  }

  .nmorph-slide__native-input {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 100%;
    background: transparent;
    appearance: none;
  }

  .nmorph-slide__native-input::-webkit-slider-runnable-track {
    height: var(--slider-height);
    background: transparent;
  }

  .nmorph-slide__native-input::-moz-range-track {
    height: var(--slider-height);
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
    ${disabled()}
    .nmorph-slider__input-content {
      pointer-events: none;
    }
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  .nmorph-slider__thumb {
    width: ${props => props.thumbWidthCss};
  }
`
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ thumbWidthCss }">
    <div class="nmorph-slider__content">
      <div class="nmorph-slider__input-wrapper">
        <div ref="sliderContainer" class="nmorph-slider__input-container">
          <NmorphTooltip ref="tooltipRootRef" v-if="tooltipVisible && !props.disabled" :text="String(thumbValue)"
            force-show :force-coordinate="{ x: thumbXPercentPosition.tooltip, y: '24px' }" block-position />
          <div ref="sliderFirst" class="nmorph-slider__thumb" :style="{ left: thumbXPercentPosition.thumb }"
            :class="{ 'nmorph-slider__thumb--smooth': transitionEnabled }" @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave" @mousedown="mousedownHandler" />
          <input :id="id" :name="name" :tabindex="tabindex" class="nmorph-slide__native-input" type="range" :value="thumbValue"
            :min="props.min" :max="props.max" :step="props.step" :disabled="props.disabled"
            @input="nativeInputHandler" />
        </div>
      </div>
    </div>
  </StyledComponent>
</template>
