<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tooltip-force-coordinate-overview">
    <ClientOnly>
      <NmorphTooltip
        text="Tooltip"
        force-show
        position="right"
        :force-coordinate="{ x: '200px', y: '50px' }"
      >
        <NmorphButton text="OK" />
      </NmorphTooltip>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.tooltip-force-coordinate-overview {
}
</style>
