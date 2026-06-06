<script setup lang="ts">
import { ref } from "vue";
import { NmorphButton, NmorphCard, NmorphStepper } from "@nmorph/nmorph-ui-kit";

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
    <NmorphCard
      v-for="slide in slides"
      :key="slide.title"
      class="stepper-basic-usage__slide"
    >
      <strong>{{ slide.title }}</strong>
      <span>{{ slide.text }}</span>
    </NmorphCard>
    <template #indicator="{ index, count, goTo, next, previous }">
      <div class="stepper-basic-usage__indicator">
        <NmorphButton design="plain" thickness="thin" @click="previous">
          Back
        </NmorphButton>
        <button
          v-for="stepIndex in count"
          :key="stepIndex"
          type="button"
          class="stepper-basic-usage__dot"
          :class="{ 'stepper-basic-usage__dot--active': index === stepIndex - 1 }"
          :aria-label="`Go to step ${stepIndex}`"
          @click="goTo(stepIndex - 1)"
        />
        <NmorphButton design="plain" thickness="thin" @click="next">
          Next
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
  min-height: 136px;
  display: grid;
  align-content: center;
  gap: 8px;
}

.stepper-basic-usage__indicator {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
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
