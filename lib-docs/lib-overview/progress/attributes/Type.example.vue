<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="progress-type-overview">
    <NmorphProgress :percentage="50" color="var(--nmorph-accent-color)" />
    <NmorphProgress
      type="circle"
      :percentage="50"
      class="circle-progress"
      color="pink"
    />
  </div>
</template>

<style lang="scss">
.progress-type-overview {
  width: 100%;
  display: flex;
  align-items: center;

  .nmorph-progress {
    width: 50%;
  }

  .circle-progress {
    display: flex;
    justify-content: center;
  }
}
</style>
