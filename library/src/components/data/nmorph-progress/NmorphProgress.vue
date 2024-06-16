<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useModifiers } from '@/utils';
import { NmorphProgressColorType, NmorphProgressType } from '@/components';

interface INmorphProps {
  type?: NmorphProgressType;
  color?: NmorphProgressColorType;
  percentage: number;
  textInside?: boolean;
  showText?: boolean;
  indeterminate?: boolean;
  circleSize?: number;
  strokeWidth?: number;
}

const props = withDefaults(defineProps<INmorphProps>(), {
  height: 'default',
  type: 'linear',
  color: 'var(--info-color-00)',
  textInside: false,
  showText: true,
  indeterminate: false,
  circleSize: 120,
  strokeWidth: 4,
});

const modifiers = computed(() =>
  useModifiers({
    'nmorph-progress': [],
  })
);

const innerContentWidth = computed(() => `${props.percentage}%`);

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
</script>

<template>
  <div :class="modifiers">
    <div v-if="props.type === 'linear'" class="nmorph-progress__linear">
      <div class="nmorph-progress__outer">
        <div class="nmorph-progress__inner">
          <div v-if="textInside" class="nmorph-progress__inner-text">
            <slot name="inner-text"> {{ displayPercentage }} </slot>
          </div>
        </div>
      </div>
      <div v-if="showText" class="nmorph-progress__percentage">
        <slot name="right-sight">{{ displayPercentage }}</slot>
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
  --height: 8px;
  --width-transition: 0.4s ease-in-out width;
  --animation: slide 2s linear infinite;

  .nmorph-progress__linear {
    height: 100%;
    display: flex;
    align-items: center;
    height: var(--height);

    .nmorph-progress__outer {
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius-circular);
      overflow: hidden;
      @include nmorph-inset;
    }
    .nmorph-progress__inner {
      position: relative;
      width: v-bind(innerContentWidth);
      background: v-bind(color);
      border-radius: var(--border-radius-circular);
      transition: var(--width-transition);
      height: 100%;
      animation: v-bind(animation);
    }
    .nmorph-progress__percentage,
    .nmorph-progress__inner-text {
      margin-left: var(--indentation-03);
      @include body-3;
    }
    .nmorph-progress__inner-text {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: var(--indentation-02);
      @include body-3;
      color: var(--lighter-color);
    }
  }

  .nmorph-progress__circle {
    width: v-bind(circleContainerSize);
    height: v-bind(circleContainerSize);
    border-radius: var(--border-radius-circular);
    position: relative;
    @include nmorph-inset;

    &:after {
      content: '';
      width: 92%;
      height: 92%;
      border-radius: var(--border-radius-circular);
      @include absolute-center;
      @include nmorph-dark-shadow;
    }
  }

  .nmorph-progress__circle-inner-part {
    z-index: 1;
    @include absolute-center;
  }

  .nmorph-progress__circle-ring {
    stroke-width: v-bind(strokeWidth);
    stroke: v-bind(color);
    fill: none;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dashoffset 0.5s;
  }
}

@keyframes slide {
  from {
    left: -50%;
  }
  to {
    left: 100%;
  }
}
</style>
