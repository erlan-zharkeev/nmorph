<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-ripple-overview">
    <NmorphButton design="nmorph" ripple text="I have ripple" />
    <NmorphButton
      design="nmorph"
      ripple
      accent-bg-on-hover
      text="I have ripple and hover background"
    />
    <NmorphButton :ripple="false" text="I do not have ripple" />
  </div>
</template>

<style lang="scss">
.button-ripple-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
</style>
