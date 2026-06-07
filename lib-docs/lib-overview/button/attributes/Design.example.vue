<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-design-overview">
    <NmorphButton design="nmorph">Nmorph</NmorphButton>
    <NmorphButton design="plain">Plain</NmorphButton>
    <NmorphButton design="plain" borderless>Borderless</NmorphButton>
    <NmorphButton design="plain" color="var(--nmorph-accent-color)">Edit</NmorphButton>
  </div>
</template>

<style lang="scss">
.button-design-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
