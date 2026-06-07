<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssSizeVariables, createCssVariables, useModifiers } from '@/utils';
import type { INmorphProgressProps } from './types';

const props = withDefaults(defineProps<INmorphProgressProps>(), {
  type: 'linear',
  color: 'var(--nmorph-accent-color)',
  valueInside: false,
  valueRightSide: true,
  indeterminate: false,
  circleSize: 120,
  height: undefined,
  widthTransition: undefined,
  indeterminateAnimation: undefined,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-progress': [props.indeterminate && 'indeterminate'],
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
  return props.indeterminate ? 'var(--nmorph-private-progress-indeterminate-animation)' : 'none';
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
const linearHeight = computed(() => props.height ?? (props.valueInside ? '18px' : undefined));
const styles = computed<CSSProperties>(() => ({
  ...createCssVariables({
    '--nmorph-private-progress-percentage': displayPercentage.value,
    '--nmorph-private-progress-color': color.value,
    '--nmorph-private-progress-animation': animation.value,
    '--nmorph-private-progress-circle-size': circleContainerSize.value,
    '--nmorph-private-progress-width-transition': props.widthTransition,
    '--nmorph-private-progress-indeterminate-animation': props.indeterminateAnimation,
  }),
  ...createCssSizeVariables({
    '--nmorph-private-progress-height': linearHeight.value,
  }),
}));
</script>

<template>
  <div :class="modifiers" :style="styles">
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
        <circle
          ref="circle"
          class="nmorph-progress__circle-ring"
          :cx="props.circleSize / 2"
          :cy="props.circleSize / 2"
          :r="props.circleSize / 2 - 2"
          :stroke-dasharray="strokeDasharray"
          :stroke-dashoffset="strokeDashoffset"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-progress {
  --nmorph-private-progress-height: 8px;
  --nmorph-private-progress-width-transition: 0.4s ease-in-out width;
  --nmorph-private-progress-indeterminate-animation: nmorph-progress-indeterminate 1.4s ease-in-out infinite;

  display: inline;

  .nmorph-progress__linear {
    display: flex;
    align-items: center;
    height: 100%;
    height: var(--nmorph-private-progress-height);

    .nmorph-progress__outer {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: var(--nmorph-main-color);
      border-radius: var(--border-radius-40);
      box-shadow:
        inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
        inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
          var(--nmorph-light-shade-color);
    }

    .nmorph-progress__inner {
      position: relative;
      height: 100%;
      border-radius: var(--border-radius-40);
      transition: var(--nmorph-private-progress-width-transition);
    }

    .nmorph-progress__percentage,
    .nmorph-progress__inner-text {
      margin-left: var(--indentation-03);
      font-weight: var(--nmorph-typography-caption-font-weight);
      font-size: var(--nmorph-typography-caption-font-size);
      line-height: var(--nmorph-typography-caption-line-height);
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
    width: var(--nmorph-private-progress-circle-size);
    height: var(--nmorph-private-progress-circle-size);
    background: var(--nmorph-main-color);
    border-radius: var(--border-radius-circular);
    box-shadow:
      inset var(--base-shadow-width) var(--base-shadow-width) var(--base-shadow-blur) var(--nmorph-dark-shade-color),
      inset calc(-1 * var(--base-shadow-width)) calc(-1 * var(--base-shadow-width)) var(--base-shadow-blur)
        var(--nmorph-light-shade-color);

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 92%;
      height: 92%;
      background: var(--nmorph-main-color);
      border-radius: var(--border-radius-circular);
      box-shadow: 0 0 var(--base-shadow-blur) var(--nmorph-dark-shade-color);
      transform: translate(-50%, -50%);
      content: '';
    }
  }

  .nmorph-progress__circle-inner-part {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transform: translate(-50%, -50%);
  }

  .nmorph-progress__circle-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dashoffset 0.5s;
    fill: none;
    stroke: var(--nmorph-private-progress-color);
    stroke-width: 4px;
  }

  .nmorph-progress__inner {
    width: var(--nmorph-private-progress-percentage);
    background: var(--nmorph-private-progress-color);
    animation: var(--nmorph-private-progress-animation);
  }

  &.nmorph-progress--indeterminate {
    .nmorph-progress__inner {
      width: 40%;
      min-width: 32px;
      transform: translateX(-100%);
      transition: none;
      will-change: transform;
    }
  }
}

@keyframes nmorph-progress-indeterminate {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(250%);
  }
}
</style>
