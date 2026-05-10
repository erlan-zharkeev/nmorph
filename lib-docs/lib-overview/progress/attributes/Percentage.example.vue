<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="progress-percentage-overview">
    <ClientOnly>
      <NmorphProgress :percentage="33" color="pink" />
      <NmorphProgress :percentage="66" color="var(--nmorph-accent-color)" />
      <NmorphProgress :percentage="99" color="lightblue" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.progress-percentage-overview {
  width: 100%;

  .nmorph-progress__linear {
    margin-bottom: 12px;
  }
}
</style>
