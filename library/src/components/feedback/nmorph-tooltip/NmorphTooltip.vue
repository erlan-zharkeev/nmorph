<script setup lang="ts">
import { usePlacement } from '@/hooks';
import { INmorphCoords, NmorphDomElementType, NmorphPlacementType } from '@/types';
import { useModifiers } from '@/utils';
import { computed, ref } from 'vue';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  text?: string;
  position?: NmorphPlacementType;
  forceShow?: boolean;
  forceCoordinate?: Partial<INmorphCoords<string>> | null;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  text: '',
  position: 'top',
  forceShow: false,
  forceCoordinate: null,
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
      `${Boolean(props.forceCoordinate?.x) && Boolean(props.forceCoordinate?.y) && 'force-coords'}`,
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

const width = computed(() => (props.forceCoordinate ? '100%' : 'auto'));
const tooltipBody = ref<NmorphDomElementType>(null);
defineExpose({ tooltipBody });

const commonCSS = css`
  --max-width: 120px;

  --width: fit-content;
  --height: fit-content;

  display: inline-block;

  .nmorph-tooltip__content {
    position: relative;
  }

  .nmorph-tooltip__info-content {
    position: absolute;
    max-width: var(--max-width);
    padding: var(--indentation-03);
    border-radius: var(--default-border-radius);
    box-shadow: 0px 0px 20px var(--nmorph-dark-shade-color);
    width: var(--width);
    height: var(--height);
    background: var(--nmorph-main-color);
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
      border-color: var(--nmorph-main-color) transparent transparent transparent;
      border-width: 8px 8px 0;
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
      border-color: transparent var(--nmorph-main-color) transparent transparent;
      border-width: 8px 8px 8px 0;
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
      border-color: transparent transparent var(--nmorph-main-color) transparent;
      border-width: 0 8px 8px;
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
      border-color: transparent transparent transparent var(--nmorph-main-color);
      border-width: 8px 0 8px 8px;
      transform: translateY(-50%);
    }
  }

  &.nmorph-tooltip--force-coords {
    .nmorph-tooltip__info-content {
      transform: none;
    }
  }
`

const StyledComponent = styled.div`
  ${commonCSS}
  width: ${props => props.width};

`
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ width }">
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
          class="nmorph-tooltip__info-content"
          :style="{ left: forceCoordinate?.x, bottom: forceCoordinate?.y }"
          ref="tooltipBody"
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
  </StyledComponent>
</template>
