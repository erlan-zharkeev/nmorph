<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-ripple-overview">
    <NmorphButton style-type="default" ripple text="I have ripple" />
    <NmorphButton
      style-type="default"
      ripple
      accent-bg-on-hover
      text="I have ripple and hover background"
    />
    <NmorphButton :ripple="false" text="I do not have ripple" />
  </div>
</template>

<style lang="scss">
.button-ripple-overview {
  .nmorph-button {
    margin: 4px 8px;
  }
}
</style>
