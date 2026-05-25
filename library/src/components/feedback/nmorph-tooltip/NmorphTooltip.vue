<script setup lang="ts">
import { usePlacement } from '@/hooks/use-placement';
import { useZIndex } from '@/hooks/use-z-index';
import { NmorphDomElementType } from '@/types';
import { createCssSizeVariables, useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import type { CSSProperties } from 'vue';
import type { INmorphTooltipProps } from './types';

const props = withDefaults(defineProps<INmorphTooltipProps>(), {
  text: '',
  position: 'top',
  forceShow: false,
  forceCoordinate: null,
  zIndex: undefined,
  width: undefined,
  maxWidth: undefined,
  height: undefined,
});

const showTooltip = ref(props.forceShow);
const tooltipDOMRef = ref<NmorphDomElementType>(null);
const slotDOMRef = ref<NmorphDomElementType>(null);

const { placement } = usePlacement({
  initialPlacement: props.position,
  contentDOMElement: tooltipDOMRef,
  relativeElement: slotDOMRef,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-tooltip': [
      placement.value,
      Boolean(props.forceCoordinate?.x) && Boolean(props.forceCoordinate?.y) && 'force-coords',
    ],
  })
);

const handleMouseEnter = () => {
  showTooltip.value = true;
};

const handleMouseLeave = () => {
  if (props.forceShow) return;
  showTooltip.value = false;
};

const rootWidth = computed(() => (props.forceCoordinate ? '100%' : 'auto'));
const zIndex = useZIndex(
  () => showTooltip.value,
  () => props.zIndex
);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-tooltip-width': rootWidth.value,
  '--nmorph-tooltip-z-index': zIndex.value,
  ...createCssSizeVariables({
    '--width': props.width,
    '--max-width': props.maxWidth,
    '--height': props.height,
  }),
}));
const tooltipBody = ref<NmorphDomElementType>(null);
defineExpose({ tooltipBody });
</script>

<template>
  <div :class="modifiers" :style="styles">
    <div
      ref="tooltipDOMRef"
      class="nmorph-tooltip__content"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div ref="slotDOMRef">
        <slot />
      </div>
      <transition-group v-if="props.forceCoordinate" name="opacity" tag="div">
        <div
          v-if="showTooltip && props.text"
          ref="tooltipBody"
          class="nmorph-tooltip__info-content"
          :style="{ left: forceCoordinate?.x, bottom: forceCoordinate?.y }"
        >
          <div class="nmorph-tooltip__shadow-content">
            <div v-if="!props.forceCoordinate" class="nmorph-tooltip__triangle" />
            <span>{{ text }}</span>
          </div>
        </div>
      </transition-group>
      <transition-group v-else name="opacity" tag="div">
        <div v-if="showTooltip" class="nmorph-tooltip__info-content">
          <div class="nmorph-tooltip__shadow-content">
            <div class="nmorph-tooltip__triangle" />
            <span v-if="props.text">{{ text }}</span>
            <slot v-else name="content" />
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-tooltip {
  --max-width: 120px;

  --width: fit-content;
  --height: fit-content;

  display: inline-block;

  .nmorph-tooltip__content {
    position: relative;
  }

  .nmorph-tooltip__info-content {
    position: absolute;
    z-index: var(--nmorph-tooltip-z-index);
    width: var(--width);
    max-width: var(--max-width);
    height: var(--height);
    padding: var(--indentation-03);
    background: var(--nmorph-main-color);
    border-radius: var(--default-border-radius);
    box-shadow: 0 0 20px var(--nmorph-dark-shade-color);
  }

  span {
    white-space: nowrap;
  }

  .nmorph-tooltip__triangle {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
  }

  &.nmorph-tooltip--top {
    .nmorph-tooltip__info-content {
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 100%;
      left: 50%;
      border-width: 8px 8px 0;
      border-color: var(--nmorph-main-color) transparent transparent transparent;
      transform: translateX(-50%);
    }
  }

  &.nmorph-tooltip--right {
    .nmorph-tooltip__info-content {
      top: 50%;
      left: calc(100% + 12px);
      transform: translateY(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 50%;
      right: 100%;
      border-width: 8px 8px 8px 0;
      border-color: transparent var(--nmorph-main-color) transparent transparent;
      transform: translateY(-50%);
    }
  }

  &.nmorph-tooltip--bottom {
    .nmorph-tooltip__info-content {
      top: calc(100% + 12px);
      left: 50%;
      transform: translateX(-50%);
    }

    .nmorph-tooltip__triangle {
      bottom: 100%;
      left: 50%;
      border-width: 0 8px 8px;
      border-color: transparent transparent var(--nmorph-main-color) transparent;
      transform: translateX(-50%);
    }
  }

  &.nmorph-tooltip--left {
    .nmorph-tooltip__info-content {
      top: 50%;
      right: calc(100% + 12px);
      transform: translateY(-50%);
    }

    .nmorph-tooltip__triangle {
      top: 50%;
      left: 100%;
      border-width: 8px 0 8px 8px;
      border-color: transparent transparent transparent var(--nmorph-main-color);
      transform: translateY(-50%);
    }
  }

  &.nmorph-tooltip--force-coords {
    .nmorph-tooltip__info-content {
      transform: none;
    }
  }

  width: var(--nmorph-tooltip-width);
}
</style>
