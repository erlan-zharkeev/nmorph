<script setup lang="ts">
import { NmorphTooltip, NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="tooltip-text-overview">
    <ClientOnly>
      <NmorphTooltip :text="$t('overview.tooltip.text.i-am-tooltip')">
        <NmorphButton :text="$t('overview.tooltip.text.hover-me')" />
      </NmorphTooltip>
    </ClientOnly>
  </div>
</template>
