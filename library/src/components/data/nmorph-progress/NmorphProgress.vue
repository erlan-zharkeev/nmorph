<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { body3, nmorphInset, useModifiers } from '@/utils';
import { NmorphProgressColorType, NmorphProgressType } from '@/components';
import { styled, css } from '@vue-styled-components/core'

interface INmorphProps {
  type?: NmorphProgressType;
  color?: NmorphProgressColorType;
  percentage: number;
  valueInside?: boolean;
  valueRightSide?: boolean;
  indeterminate?: boolean;
  circleSize?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  type: 'linear',
  color: 'var(--nmorph-accent-color)',
  valueInside: false,
  valueRightSide: true,
  indeterminate: false,
  circleSize: 120,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-progress': [],
  })
);

const color = computed(() => {
  if (Array.isArray(props.color)) {
    return props.color.find((el) => el.percentage <= props.percentage)?.color;
  }
  if (typeof props.color === 'function') return props.color(props.percentage);
  return props.color;
});

const animation = computed(() => {
  return props.indeterminate ? 'var(--animation)' : 'none';
});

const circle = ref<SVGCircleElement | null>(null);
const circumference = ref(1);
const strokeDasharray = computed(() => `${circumference.value} ${circumference.value}`);
const strokeDashoffset = computed(() => circumference.value - (props.percentage / 100) * circumference.value);

onMounted(() => {
  if (!circle.value) return;
  circumference.value = 2 * Math.PI * circle.value.r.baseVal.value;
});

const circleContainerSize = computed(() => `${props.circleSize}px`);
const displayPercentage = computed(() => `${props.percentage}%`);

const commonCSS = css`
  --height: 8px;
  --width-transition: 0.4s ease-in-out width;
  --animation: slide 2s linear infinite;

  display: inline;

  .nmorph-progress__linear {
    display: flex;
    align-items: center;
    height: 100%;
    height: var(--height);

    .nmorph-progress__outer {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: var(--border-radius-40);
      ${nmorphInset()}
    }

    .nmorph-progress__inner {
      position: relative;
      height: 100%;
      border-radius: var(--border-radius-40);
      transition: var(--width-transition);
    }

    .nmorph-progress__percentage,
    .nmorph-progress__inner-text {
      ${body3()}
      margin-left: var(--indentation-03);
    }

    .nmorph-progress__inner-text {
      position: absolute;
      top: 50%;
      right: var(--indentation-02);
      color: var(--nmorph-light-shade-color);
      transform: translateY(-50%);
    }
  }

  .nmorph-progress__circle {
    position: relative;
    border-radius: var(--border-radius-circular);
    ${nmorphInset()}

    &::after {
      width: 92%;
      height: 92%;
      border-radius: var(--border-radius-circular);
      content: '';

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--nmorph-main-color);
      box-shadow: 0 0 var(--base-shadow-blur) var(--nmorph-dark-shade-color);
    }
  }

  .nmorph-progress__circle-inner-part {
    z-index: 1;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .nmorph-progress__circle-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dashoffset 0.5s;
    fill: none;
    stroke-width: 4px;
  }
`

const StyledComponent = styled.div`
  ${commonCSS}

  .nmorph-progress__inner {
    width: ${props => props.displayPercentage};
    background: ${props => props.color};
    animation: ${props => props.animation};
  }

  .nmorph-progress__circle {
    width: ${props => props.circleContainerSize};
    height: ${props => props.circleContainerSize};
  }

  .nmorph-progress__circle-ring {
    stroke: ${props => props.color};
  }
`
</script>

<template>
  <StyledComponent :class="modifiers" :props="{ displayPercentage, color, animation, circleContainerSize }">
    <div v-if="props.type === 'linear'" class="nmorph-progress__linear">
      <div class="nmorph-progress__outer">
        <div class="nmorph-progress__inner">
          <div v-if="valueInside" class="nmorph-progress__inner-text">
            <slot name="inner-text"> {{ displayPercentage }} </slot>
          </div>
        </div>
      </div>
      <div v-if="valueRightSide" class="nmorph-progress__percentage">
        <slot name="right-side">{{ displayPercentage }}</slot>
      </div>
    </div>
    <div v-if="props.type === 'circle'" class="nmorph-progress__circle">
      <div class="nmorph-progress__circle-inner-part">
        <slot name="circle-inner-part">{{ displayPercentage }}</slot>
      </div>
      <svg :width="props.circleSize" :height="props.circleSize">
        <circle ref="circle" class="nmorph-progress__circle-ring" :cx="props.circleSize / 2" :cy="props.circleSize / 2"
          :r="props.circleSize / 2 - 2" :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" />
      </svg>
    </div>
  </StyledComponent>
</template>
