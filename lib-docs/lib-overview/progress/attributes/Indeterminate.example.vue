<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="progress-indeterminate-overview">
    <ClientOnly>
      <NmorphProgress
        :percentage="50"
        indeterminate
        color="var(--nmorph-accent-color)"
        :value-right-side="false"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.progress-indeterminate-overview {
  width: 100%;
}
</style>
