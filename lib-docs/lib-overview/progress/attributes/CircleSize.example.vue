<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="progress-circle-size-overview">
    <NmorphProgress
      :percentage="33"
      :circle-size="50"
      type="circle"
      color="var(--nmorph-accent-color)"
    />
    <NmorphProgress
      :percentage="33"
      :circle-size="100"
      type="circle"
      color="var(--nmorph-error-color)"
    />
    <NmorphProgress
      :percentage="33"
      :circle-size="120"
      type="circle"
      color="pink"
    />
  </div>
</template>

<style lang="scss">
.progress-circle-size-overview {
  width: 100%;
  display: flex;
  align-items: center;

  .nmorph-progress {
    margin-right: 16px;
  }
}
</style>
