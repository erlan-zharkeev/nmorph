<script setup lang="ts">
import { ref } from "vue";
import {
  NmorphButton,
  NmorphCard,
  NmorphGuide,
  NmorphGuideStep,
} from "@nmorph/nmorph-ui-kit";

const guideOpen = ref(false);
</script>

<template>
  <div class="guide-step-basic-usage">
    <NmorphButton thickness="basic" @click="guideOpen = true">
      Show target step
    </NmorphButton>

    <NmorphGuide v-model="guideOpen" :show-progress="false" max-width="260px">
      <NmorphGuideStep
        name="target-card"
        title="Wrapped target"
        text="NmorphGuideStep registers this target and controls where the guide card appears."
        position="right"
      >
        <NmorphCard class="guide-step-basic-usage__target" :paper="3">
          Wrapped target
        </NmorphCard>
      </NmorphGuideStep>
    </NmorphGuide>
  </div>
</template>

<style scoped>
.guide-step-basic-usage {
  display: grid;
  gap: 16px;
  align-items: start;
  width: 100%;
}

.guide-step-basic-usage__target {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  min-height: 80px;
}
</style>
