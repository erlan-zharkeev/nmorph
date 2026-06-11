<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import { useModifiers } from '@/utils';
import type {
  INmorphStepperChangePayload,
  INmorphStepperEmit,
  INmorphStepperIndicatorSlotProps,
  INmorphStepperProps,
  INmorphStepperSlots,
  NmorphStepperDirection,
} from './types';

const WHEEL_THRESHOLD = 28;
const WHEEL_LOCK_IN_MS = 320;
const DRAG_CLICK_THRESHOLD = 6;
const SWIPE_THRESHOLD = 42;
const SWIPE_AXIS_RATIO = 1.2;
const CLICK_SUPPRESSION_IN_MS = 350;

const props = withDefaults(defineProps<INmorphStepperProps>(), {
  modelValue: 0,
  count: 0,
  disabled: false,
  loop: false,
  wheel: true,
  swipe: true,
  ariaLabel: 'Stepper',
});

defineSlots<INmorphStepperSlots>();

const emit = defineEmits<INmorphStepperEmit>();

const wheelLocked = ref(false);
const wheelUnlockTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const suppressClick = ref(false);
const suppressClickTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const pointerStart = ref<{ x: number; y: number; pointerId: number | null } | null>(null);
const pointerDragging = ref(false);

const toFiniteInteger = (value: number | undefined) => {
  if (!Number.isFinite(value)) return 0;

  return Math.trunc(value ?? 0);
};

const normalizedCount = computed(() => Math.max(0, toFiniteInteger(props.count)));

const normalizeIndex = (index: number | undefined) => {
  const count = normalizedCount.value;
  const value = toFiniteInteger(index);

  if (count <= 0) return 0;
  if (!props.loop) return Math.min(Math.max(value, 0), count - 1);

  return ((value % count) + count) % count;
};

const currentIndex = computed(() => normalizeIndex(props.modelValue));
const isInteractive = computed(() => !props.disabled && normalizedCount.value > 1);
const tabIndex = computed(() => (isInteractive.value ? 0 : undefined));
const trackStyle = computed<CSSProperties>(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
}));
const modifiers = computed(() =>
  useModifiers({
    'nmorph-stepper': [props.disabled && 'disabled', isInteractive.value && 'interactive'],
  })
);

const getDirection = (index: number, previousIndex: number): NmorphStepperDirection =>
  index < previousIndex ? 'previous' : 'next';

const emitStepChange = (index: number, previousIndex: number, direction: NmorphStepperDirection) => {
  const payload: INmorphStepperChangePayload = { index, previousIndex, direction };

  emit('update:model-value', index);
  emit('change', payload);
};

const goTo = (index: number) => {
  if (props.disabled) return;

  const previousIndex = currentIndex.value;
  const nextIndex = normalizeIndex(index);

  if (nextIndex === previousIndex) return;

  emitStepChange(nextIndex, previousIndex, getDirection(nextIndex, previousIndex));
};

const move = (direction: NmorphStepperDirection) => {
  if (!isInteractive.value) return;

  const offset = direction === 'next' ? 1 : -1;

  goTo(currentIndex.value + offset);
};

const next = () => move('next');
const previous = () => move('previous');

const clearWheelLock = () => {
  if (wheelUnlockTimer.value) clearTimeout(wheelUnlockTimer.value);
  wheelUnlockTimer.value = null;
  wheelLocked.value = false;
};

const lockWheel = () => {
  clearWheelLock();
  wheelLocked.value = true;
  wheelUnlockTimer.value = setTimeout(clearWheelLock, WHEEL_LOCK_IN_MS);
};

const getWheelDelta = (event: WheelEvent) => {
  const absoluteDeltaX = Math.abs(event.deltaX);
  const absoluteDeltaY = Math.abs(event.deltaY);

  if (absoluteDeltaX === 0 && absoluteDeltaY === 0) return 0;
  if (absoluteDeltaX >= absoluteDeltaY) return event.deltaX;

  return event.deltaY;
};

const handleWheel = (event: WheelEvent) => {
  if (!isInteractive.value || !props.wheel) return;

  const delta = getWheelDelta(event);

  if (Math.abs(delta) < WHEEL_THRESHOLD) return;

  event.preventDefault();

  if (wheelLocked.value) return;

  if (delta > 0) next();
  else previous();

  lockWheel();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!isInteractive.value) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    previous();
  }
};

const clearClickSuppression = () => {
  if (suppressClickTimer.value) clearTimeout(suppressClickTimer.value);
  suppressClickTimer.value = null;
  suppressClick.value = false;
};

const suppressNextClick = () => {
  clearClickSuppression();
  suppressClick.value = true;
  suppressClickTimer.value = setTimeout(clearClickSuppression, CLICK_SUPPRESSION_IN_MS);
};

const getPointerDiff = (event: PointerEvent) => {
  if (!pointerStart.value) return null;

  return {
    x: event.clientX - pointerStart.value.x,
    y: event.clientY - pointerStart.value.y,
  };
};

const isHorizontalDrag = (diff: { x: number; y: number }, threshold: number) =>
  Math.abs(diff.x) >= threshold && Math.abs(diff.x) > Math.abs(diff.y) * SWIPE_AXIS_RATIO;

const handlePointerDown = (event: PointerEvent) => {
  if (!isInteractive.value || !props.swipe) return;
  if (event.pointerType === 'mouse' && event.button !== 0) return;

  (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);
  pointerStart.value = {
    x: event.clientX,
    y: event.clientY,
    pointerId: event.pointerId ?? null,
  };
  pointerDragging.value = false;
};

const handlePointerMove = (event: PointerEvent) => {
  if (!pointerStart.value) return;
  if (pointerStart.value.pointerId !== null && event.pointerId !== pointerStart.value.pointerId) return;

  const diff = getPointerDiff(event);

  if (!diff || !isHorizontalDrag(diff, DRAG_CLICK_THRESHOLD)) return;

  pointerDragging.value = true;
  event.preventDefault();
};

const clearPointer = () => {
  pointerStart.value = null;
  pointerDragging.value = false;
};

const handlePointerEnd = (event: PointerEvent) => {
  if (!pointerStart.value) return;
  if (pointerStart.value.pointerId !== null && event.pointerId !== pointerStart.value.pointerId) return;

  const diff = getPointerDiff(event);
  const hasRealDrag = Boolean(diff && isHorizontalDrag(diff, DRAG_CLICK_THRESHOLD));

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture?.(event.pointerId);

  if (hasRealDrag || pointerDragging.value) suppressNextClick();

  if (diff && isHorizontalDrag(diff, SWIPE_THRESHOLD)) {
    if (diff.x > 0) previous();
    else next();
  }

  clearPointer();
};

const handleClickCapture = (event: MouseEvent) => {
  if (!suppressClick.value) return;

  event.preventDefault();
  event.stopPropagation();
  clearClickSuppression();
};

const indicatorSlotProps = computed<INmorphStepperIndicatorSlotProps>(() => ({
  index: currentIndex.value,
  count: normalizedCount.value,
  goTo,
  next,
  previous,
}));

watch(
  () => [props.modelValue, normalizedCount.value, props.loop] as const,
  ([modelValue]) => {
    const nextIndex = normalizeIndex(modelValue);

    if (nextIndex === modelValue) return;

    emitStepChange(nextIndex, toFiniteInteger(modelValue), getDirection(nextIndex, toFiniteInteger(modelValue)));
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  clearWheelLock();
  clearClickSuppression();
});

defineExpose({ goTo, next, previous });
</script>

<template>
  <div
    :class="modifiers"
    role="group"
    aria-roledescription="stepper"
    :aria-label="props.ariaLabel"
    :aria-disabled="props.disabled || undefined"
    :tabindex="tabIndex"
    @wheel="handleWheel"
    @keydown="handleKeydown"
    @pointerdown="handlePointerDown"
    @pointermove="handlePointerMove"
    @pointerup="handlePointerEnd"
    @pointercancel="clearPointer"
    @pointerleave="clearPointer"
    @click.capture="handleClickCapture"
  >
    <div class="nmorph-stepper__viewport" aria-live="polite" aria-atomic="true">
      <div class="nmorph-stepper__track" :style="trackStyle">
        <slot />
      </div>
    </div>
    <div
      v-if="$slots.indicator"
      class="nmorph-stepper__indicator"
      @pointerdown.stop
      @pointermove.stop
      @pointerup.stop
      @pointercancel.stop
      @pointerleave.stop
      @wheel.stop
    >
      <slot name="indicator" v-bind="indicatorSlotProps" />
    </div>
  </div>
</template>

<style lang="scss">
.nmorph-stepper {
  width: 100%;
  border-radius: var(--default-border-radius);

  &.nmorph-stepper--interactive {
    cursor: grab;
  }

  &.nmorph-stepper--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid var(--nmorph-accent-color);
    outline-offset: 2px;
  }
}

.nmorph-stepper__viewport {
  width: 100%;
  overflow: hidden;
  border-radius: inherit;
  touch-action: pan-y;
}

.nmorph-stepper__track {
  display: flex;
  width: 100%;
  min-width: 0;
  transition: transform 0.24s ease;
  will-change: transform;
}

.nmorph-stepper__track > * {
  flex: 0 0 100%;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
}

.nmorph-stepper__indicator {
  width: 100%;
}
</style>
