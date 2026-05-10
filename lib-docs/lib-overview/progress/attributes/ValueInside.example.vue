<script setup lang="ts">
import { NmorphProgress } from "@nmorph/nmorph-ui-kit";

const percentage = 33;
</script>

<template>
  <div class="progress-value-inside-overview">
    <ClientOnly>
      <NmorphProgress
        :percentage="percentage"
        value-inside
        :value-right-side="false"
        color="pink"
      >
        <template #inner-text>
          <span>{{ $t("overview.i-am-slot-prefix") }} {{ percentage }}%</span>
        </template>
      </NmorphProgress>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.progress-value-inside-overview {
  width: 100%;

  .nmorph-progress {
    --height: 16px;
  }
}
</style>
