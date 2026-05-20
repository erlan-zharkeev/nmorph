<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tooltip-text-overview">
    <ClientOnly>
      <NmorphTooltip text="I am a tooltip">
        <NmorphButton text="Hover over me" />
      </NmorphTooltip>
    </ClientOnly>
  </div>
</template>
