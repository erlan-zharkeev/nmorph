<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { createCssVariables, useModifiers } from '@/utils';
import type { INmorphAudioMeterProps } from './types';

const props = withDefaults(defineProps<INmorphAudioMeterProps>(), {
  value: undefined,
  volumeDb: undefined,
  variant: 'bars',
  bars: 12,
  warnThreshold: 0.7,
  errorThreshold: 0.9,
  color: undefined,
  warnColor: undefined,
  errorColor: undefined,
  trackColor: undefined,
  label: 'Audio level',
});

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const level = computed(() => {
  if (typeof props.value === 'number') return clamp(props.value);
  if (typeof props.volumeDb === 'number') return clamp((props.volumeDb + 60) / 60);
  return 0;
});
const barIndexes = computed(() => Array.from({ length: Math.max(props.bars, 1) }, (_, index) => index));
const state = computed(() => {
  if (level.value >= props.errorThreshold) return 'error';
  if (level.value >= props.warnThreshold) return 'warn';
  return 'normal';
});
const modifiers = computed(() =>
  useModifiers({
    'nmorph-audio-meter': [props.variant, state.value],
  })
);
const styles = computed<CSSProperties>(() => ({
  '--nmorph-private-audio-meter-percent': `${Math.round(level.value * 100)}%`,
  ...createCssVariables({
    '--nmorph-private-audio-meter-color': props.color,
    '--nmorph-private-audio-meter-warn-color': props.warnColor,
    '--nmorph-private-audio-meter-error-color': props.errorColor,
    '--nmorph-private-audio-meter-track-color': props.trackColor,
  }),
}));
const isBarActive = (index: number) => (index + 1) / barIndexes.value.length <= level.value;
</script>

<template>
  <div
    :class="modifiers"
    :style="styles"
    role="meter"
    :aria-label="props.label"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-valuenow="Math.round(level * 100)"
  >
    <template v-if="props.variant === 'bars'">
      <span
        v-for="index in barIndexes"
        :key="index"
        class="nmorph-audio-meter__bar"
        :class="{ 'nmorph-audio-meter__bar--active': isBarActive(index) }"
      />
    </template>
    <span v-else-if="props.variant === 'line'" class="nmorph-audio-meter__line" />
    <span v-else class="nmorph-audio-meter__ring" />
  </div>
</template>

<style lang="scss">
.nmorph-audio-meter {
  --nmorph-private-audio-meter-color: var(--nmorph-success-color);
  --nmorph-private-audio-meter-warn-color: var(--nmorph-warn-color);
  --nmorph-private-audio-meter-error-color: var(--nmorph-error-color);
  --nmorph-private-audio-meter-track-color: color-mix(in srgb, var(--nmorph-text-color) 16%, transparent);
  --nmorph-private-audio-meter-percent: 0%;

  display: inline-flex;
  align-items: end;

  &.nmorph-audio-meter--warn {
    --nmorph-private-audio-meter-color: var(--nmorph-private-audio-meter-warn-color);
  }

  &.nmorph-audio-meter--error {
    --nmorph-private-audio-meter-color: var(--nmorph-private-audio-meter-error-color);
  }

  &.nmorph-audio-meter--bars {
    gap: 2px;
    width: max-content;
    height: 20px;
  }

  .nmorph-audio-meter__bar {
    width: 4px;
    height: 100%;
    background: var(--nmorph-private-audio-meter-track-color);
    border-radius: var(--border-radius-40);
    opacity: 0.7;
  }

  .nmorph-audio-meter__bar--active {
    background: var(--nmorph-private-audio-meter-color);
    opacity: 1;
  }

  &.nmorph-audio-meter--line {
    width: 72px;
    height: 6px;
    overflow: hidden;
    background: var(--nmorph-private-audio-meter-track-color);
    border-radius: var(--border-radius-40);
  }

  .nmorph-audio-meter__line {
    display: block;
    width: var(--nmorph-private-audio-meter-percent);
    height: 100%;
    background: var(--nmorph-private-audio-meter-color);
  }

  &.nmorph-audio-meter--ring {
    width: 28px;
    height: 28px;
  }

  .nmorph-audio-meter__ring {
    display: block;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at center, var(--nmorph-main-color) 56%, transparent 58%),
      conic-gradient(
        var(--nmorph-private-audio-meter-color) var(--nmorph-private-audio-meter-percent),
        var(--nmorph-private-audio-meter-track-color) 0
      );
    border-radius: var(--border-radius-circular);
  }
}
</style>
