<script setup lang="ts">
import { computed, inject, onBeforeUnmount, useSlots, watch } from 'vue';
import NmorphButton from '../../basic/nmorph-button/NmorphButton.vue';
import NmorphTooltip from '../nmorph-tooltip/NmorphTooltip.vue';
import type { INmorphGuideStepProps, INmorphGuideStepSlotProps, INmorphGuideStepSlots } from './types';
import { nmorphGuideInjectionKey } from './types';

const props = withDefaults(defineProps<INmorphGuideStepProps>(), {
  title: '',
  text: '',
  imageSrc: '',
  imageAlt: '',
  position: 'bottom',
  order: undefined,
  disabled: false,
});

defineSlots<INmorphGuideStepSlots>();

const guide = inject(nmorphGuideInjectionKey, null);
const slots = useSlots();
const currentStep = computed(() => guide?.activeStep.value ?? null);
const currentIndex = computed(() => guide?.activeIndex.value ?? -1);
const totalSteps = computed(() => guide?.steps.value.length ?? 0);
const isFirstStep = computed(() => currentIndex.value <= 0);
const isLastStep = computed(() => currentIndex.value >= totalSteps.value - 1);
const isActive = computed(() => Boolean(guide?.active.value && currentStep.value?.name === props.name));
const tooltipPosition = computed(() => currentStep.value?.position ?? props.position);
const hasCustomContent = computed(() => Boolean(slots.content));
const stepSlotProps = computed<INmorphGuideStepSlotProps | null>(() => {
  if (!guide || !currentStep.value) return null;

  return {
    step: currentStep.value,
    index: currentIndex.value,
    total: totalSteps.value,
    isFirst: isFirstStep.value,
    isLast: isLastStep.value,
    back: guide.back,
    next: guide.next,
    close: guide.close,
    finish: guide.finish,
  };
});

watch(
  () => ({
    name: props.name,
    title: props.title,
    text: props.text,
    imageSrc: props.imageSrc,
    imageAlt: props.imageAlt,
    position: props.position,
    order: props.order,
    disabled: props.disabled,
  }),
  (step) => {
    guide?.registerStep(step);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  guide?.unregisterStep(props.name);
});
</script>

<template>
  <NmorphTooltip
    :force-show="isActive"
    :position="tooltipPosition"
    :z-index="guide?.zIndex.value"
    :teleport-to="guide?.teleportTo.value"
    :disabled-teleport="guide?.disabledTeleport.value"
    :width="guide?.width.value"
    :max-width="guide?.maxWidth.value"
    :content-class="guide?.bordered.value ? 'nmorph-guide-step__tooltip--bordered' : undefined"
    :hide-triangle="guide?.bordered.value"
    trigger="manual"
    :disabled="!guide || props.disabled"
  >
    <slot />
    <template #content>
      <slot v-if="hasCustomContent && stepSlotProps" name="content" v-bind="stepSlotProps" />
      <div v-else-if="currentStep && stepSlotProps" class="nmorph-guide-step__card" role="dialog" aria-live="polite">
        <img
          v-if="currentStep.imageSrc"
          class="nmorph-guide-step__image"
          :src="currentStep.imageSrc"
          :alt="currentStep.imageAlt || currentStep.title || ''"
        />
        <div class="nmorph-guide-step__body">
          <div v-if="guide?.showProgress.value" class="nmorph-guide-step__progress">
            {{ stepSlotProps.index + 1 }} / {{ stepSlotProps.total }}
          </div>
          <h3 v-if="currentStep.title" class="nmorph-guide-step__title">{{ currentStep.title }}</h3>
          <p v-if="currentStep.text" class="nmorph-guide-step__text">{{ currentStep.text }}</p>
        </div>
        <div class="nmorph-guide-step__actions">
          <NmorphButton
            v-if="guide?.showClose.value"
            class="nmorph-guide-step__close"
            :text="guide.closeText.value"
            design="plain"
            thickness="thin"
            @click="guide.close"
          />
          <span class="nmorph-guide-step__spacer" />
          <NmorphButton
            class="nmorph-guide-step__back"
            :text="guide?.backText.value"
            design="plain"
            thickness="thin"
            :disabled="isFirstStep && !guide?.loop.value"
            @click="guide?.back"
          />
          <NmorphButton
            class="nmorph-guide-step__next"
            :text="isLastStep && !guide?.loop.value ? guide?.finishText.value : guide?.nextText.value"
            design="plain"
            thickness="thin"
            @click="isLastStep && !guide?.loop.value ? guide?.finish() : guide?.next()"
          />
        </div>
      </div>
    </template>
  </NmorphTooltip>
</template>

<style lang="scss">
.nmorph-guide-step__card {
  display: grid;
  gap: var(--indentation-03);
  box-sizing: border-box;
  min-width: min(240px, calc(100vw - 48px));
  padding: var(--indentation-02);
  border-radius: var(--default-border-radius);
}

.nmorph-guide-step__tooltip--bordered {
  box-sizing: border-box;
  border: var(--nmorph-plain-border);
}

.nmorph-guide-step__image {
  display: block;
  width: 100%;
  max-height: 140px;
  border-radius: var(--default-border-radius);
  object-fit: cover;
}

.nmorph-guide-step__body {
  display: grid;
  gap: var(--indentation-02);
}

.nmorph-guide-step__progress {
  color: var(--nmorph-placeholder-text-color);
  font-size: var(--nmorph-typography-body-small-font-size);
  line-height: var(--nmorph-typography-body-small-line-height);
}

.nmorph-guide-step__title {
  margin: 0;
  color: var(--nmorph-text-color);
  font-size: var(--nmorph-typography-title-small-font-size);
  line-height: var(--nmorph-typography-title-small-line-height);
}

.nmorph-guide-step__text {
  margin: 0;
  color: var(--nmorph-text-color);
  font-size: var(--nmorph-typography-body-font-size);
  line-height: var(--nmorph-typography-body-line-height);
}

.nmorph-guide-step__actions {
  display: flex;
  gap: var(--indentation-02);
  align-items: center;
}

.nmorph-guide-step__spacer {
  flex: 1 1 auto;
}
</style>
