<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue';
import { useZIndex } from '@/hooks/use-z-index';
import type { INmorphGuideProps, INmorphGuideEmit, INmorphGuideStepItem } from './types';
import { nmorphGuideInjectionKey, type INmorphGuideResolvedStep, type NmorphGuideStepName } from './types';

const targetOutlineColorMap: Record<string, string> = {
  accent: 'var(--nmorph-accent-color)',
  success: 'var(--nmorph-success-color)',
  error: 'var(--nmorph-error-color)',
  warning: 'var(--nmorph-warn-color)',
};

const props = withDefaults(defineProps<INmorphGuideProps>(), {
  modelValue: false,
  activeStep: undefined,
  steps: () => [],
  loop: false,
  closeOnFinish: true,
  showClose: true,
  showProgress: true,
  bordered: false,
  targetOutlineColor: 'success',
  targetOutlineOffset: 'var(--indentation-02)',
  backText: 'Back',
  nextText: 'Next',
  finishText: 'Finish',
  closeText: 'Close',
  zIndex: undefined,
  teleportTo: 'body',
  disabledTeleport: false,
  width: undefined,
  maxWidth: '280px',
});

const emit = defineEmits<INmorphGuideEmit>();

const registeredSteps = ref<Record<string, INmorphGuideResolvedStep>>({});
const internalActiveStep = ref<NmorphGuideStepName | undefined>(undefined);
let registrationCursor = 0;

const getStepKey = (name: NmorphGuideStepName) => String(name);

const stepOverrides = computed(() => {
  const overrides = new Map<string, INmorphGuideStepItem & { order: number }>();

  props.steps.forEach((step, index) => {
    overrides.set(getStepKey(step.name), {
      ...step,
      order: step.order ?? index,
    });
  });

  return overrides;
});

const steps = computed<INmorphGuideResolvedStep[]>(() =>
  Object.values(registeredSteps.value)
    .map((step) => ({
      ...step,
      ...stepOverrides.value.get(getStepKey(step.name)),
      registrationOrder: step.registrationOrder,
    }))
    .filter((step) => !step.disabled)
    .sort((first, second) => {
      const firstOrder = first.order ?? first.registrationOrder;
      const secondOrder = second.order ?? second.registrationOrder;

      return firstOrder - secondOrder;
    })
);

const active = computed(() => props.modelValue && steps.value.length > 0);
const guideZIndex = useZIndex(active, () => props.zIndex);
const activeStepName = computed(() => props.activeStep ?? internalActiveStep.value);
const activeIndex = computed(() => steps.value.findIndex((step) => step.name === activeStepName.value));
const activeStep = computed(() => steps.value[activeIndex.value] ?? null);
const isFirstStep = computed(() => activeIndex.value <= 0);
const isLastStep = computed(() => activeIndex.value >= steps.value.length - 1);
const targetOutlineColor = computed(() => targetOutlineColorMap[props.targetOutlineColor] || props.targetOutlineColor);

const setActiveStep = (name: NmorphGuideStepName) => {
  const step = steps.value.find((item) => item.name === name);

  if (!step) return;

  internalActiveStep.value = name;
  emit('update:active-step', name);
  emit('change', step, steps.value.indexOf(step));
};

const goToIndex = (index: number) => {
  const nextStep = steps.value[index];

  if (!nextStep) return;

  setActiveStep(nextStep.name);
};

const close = () => {
  emit('update:model-value', false);
  emit('close', activeStep.value, activeIndex.value);
};

const finish = () => {
  emit('finish', activeStep.value, activeIndex.value);

  if (props.closeOnFinish) close();
};

const back = () => {
  if (!activeStep.value) return;

  emit('back', activeStep.value, activeIndex.value);

  if (isFirstStep.value) {
    if (props.loop) goToIndex(steps.value.length - 1);
    return;
  }

  goToIndex(activeIndex.value - 1);
};

const next = () => {
  if (!activeStep.value) return;

  emit('next', activeStep.value, activeIndex.value);

  if (isLastStep.value) {
    if (props.loop) goToIndex(0);
    else finish();
    return;
  }

  goToIndex(activeIndex.value + 1);
};

const goToStep = (name: NmorphGuideStepName) => {
  setActiveStep(name);
};

const registerStep = (step: INmorphGuideStepItem) => {
  const key = getStepKey(step.name);
  const currentStep = registeredSteps.value[key];

  registeredSteps.value = {
    ...registeredSteps.value,
    [key]: {
      ...currentStep,
      ...step,
      registrationOrder: currentStep?.registrationOrder ?? registrationCursor,
    },
  };

  if (!currentStep) registrationCursor += 1;
};

const unregisterStep = (name: NmorphGuideStepName) => {
  const key = getStepKey(name);
  const nextSteps = { ...registeredSteps.value };

  delete nextSteps[key];
  registeredSteps.value = nextSteps;
};

watch(
  [() => props.modelValue, steps, activeStep],
  ([modelValue, availableSteps, currentStep]) => {
    if (!modelValue || currentStep || availableSteps.length === 0) return;

    setActiveStep(availableSteps[0].name);
  },
  { immediate: true }
);

provide(nmorphGuideInjectionKey, {
  active,
  activeStep,
  activeIndex,
  steps,
  loop: computed(() => props.loop),
  showClose: computed(() => props.showClose),
  showProgress: computed(() => props.showProgress),
  bordered: computed(() => props.bordered),
  targetOutlineColor,
  targetOutlineOffset: computed(() => props.targetOutlineOffset),
  backText: computed(() => props.backText),
  nextText: computed(() => props.nextText),
  finishText: computed(() => props.finishText),
  closeText: computed(() => props.closeText),
  zIndex: guideZIndex,
  teleportTo: computed(() => props.teleportTo),
  disabledTeleport: computed(() => props.disabledTeleport),
  width: computed(() => props.width),
  maxWidth: computed(() => props.maxWidth),
  registerStep,
  unregisterStep,
  goToStep,
  back,
  next,
  finish,
  close,
});

defineExpose({ back, next, finish, close, goToStep });
</script>

<template>
  <div class="nmorph-guide">
    <slot />
  </div>
</template>

<style lang="scss">
.nmorph-guide {
  display: contents;
}
</style>
