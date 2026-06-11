<script setup lang="ts">
import { ref } from "vue";
import {
  NmorphButton,
  NmorphCard,
  NmorphIconChevronLeft,
  NmorphIconChevronRight,
  NmorphStepper,
} from "@nmorph/nmorph-ui-kit";

const activeStep = ref(0);
const slides = [
  { title: "Draft", text: "Collect the first version of the content." },
  { title: "Review", text: "Move through feedback without leaving the flow." },
  { title: "Publish", text: "Confirm the final state and ship the update." },
];
</script>

<template>
  <NmorphStepper
    v-model="activeStep"
    class="stepper-basic-usage"
    :count="slides.length"
    loop
  >
    <div
      v-for="slide in slides"
      :key="slide.title"
      class="stepper-basic-usage__slide"
    >
      <NmorphCard class="stepper-basic-usage__card" shadow-type="outset" :paper="3">
        <div class="stepper-basic-usage__card-content">
          <strong>{{ slide.title }}</strong>
          <span>{{ slide.text }}</span>
        </div>
      </NmorphCard>
    </div>
    <template #indicator="{ index, count, goTo, next, previous }">
      <div class="stepper-basic-usage__indicator">
        <NmorphButton
          class="stepper-basic-usage__arrow"
          design="plain"
          thickness="thin"
          title="Previous step"
          @click="previous"
        >
          <template #icon-only>
            <NmorphIconChevronLeft />
          </template>
        </NmorphButton>
        <button
          v-for="stepIndex in count"
          :key="stepIndex"
          type="button"
          class="stepper-basic-usage__dot"
          :class="{
            'stepper-basic-usage__dot--active': index === stepIndex - 1,
          }"
          :aria-label="`Go to step ${stepIndex}`"
          @click="goTo(stepIndex - 1)"
        />
        <NmorphButton
          class="stepper-basic-usage__arrow"
          design="plain"
          thickness="thin"
          title="Next step"
          @click="next"
        >
          <template #icon-only>
            <NmorphIconChevronRight />
          </template>
        </NmorphButton>
      </div>
    </template>
  </NmorphStepper>
</template>

<style scoped>
.stepper-basic-usage {
  width: 100%;
}

.stepper-basic-usage__slide {
  box-sizing: border-box;
  min-height: 168px;
  padding: 16px;
}

.stepper-basic-usage__card {
  min-height: 136px;
}

.stepper-basic-usage__card-content {
  display: grid;
  align-content: center;
  gap: 8px;
  min-height: 104px;
}

.stepper-basic-usage__indicator {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

.stepper-basic-usage__arrow {
  flex: 0 0 auto;
}

.stepper-basic-usage__dot {
  width: 10px;
  height: 10px;
  padding: 0;
  background: color-mix(in srgb, var(--nmorph-text-color) 24%, transparent);
  border: 0;
  border-radius: 50%;
  cursor: pointer;
}

.stepper-basic-usage__dot--active {
  background: var(--nmorph-accent-color);
}
</style>
