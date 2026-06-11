<script setup lang="ts">
import { ref } from "vue";
import {
  NmorphButton,
  NmorphCard,
  NmorphGuide,
  NmorphGuideStep,
  type INmorphGuideStepItem,
} from "@nmorph/nmorph-ui-kit";

const guideOpen = ref(false);
const steps = [
  {
    name: "create",
    title: "Create",
    text: "Start the guided flow from the main action.",
    position: "bottom",
  },
  {
    name: "review",
    title: "Review",
    text: "The next step can point to any wrapped target.",
    position: "top",
  },
] satisfies INmorphGuideStepItem[];
</script>

<template>
  <div class="guide-basic-usage">
    <NmorphButton thickness="basic" @click="guideOpen = true">
      Start guide
    </NmorphButton>
    <NmorphGuide v-model="guideOpen" :steps="steps" max-width="260px">
      <div class="guide-basic-usage__targets">
        <NmorphGuideStep name="create">
          <NmorphButton design="plain" thickness="basic">
            Create item
          </NmorphButton>
        </NmorphGuideStep>
        <NmorphGuideStep name="review">
          <NmorphCard class="guide-basic-usage__card" :paper="3">
            Review queue
          </NmorphCard>
        </NmorphGuideStep>
      </div>
    </NmorphGuide>
  </div>
</template>

<style scoped>
.guide-basic-usage {
  display: grid;
  width: 100%;
  gap: 16px;
}

.guide-basic-usage__targets {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.guide-basic-usage__card {
  min-width: 180px;
}
</style>
