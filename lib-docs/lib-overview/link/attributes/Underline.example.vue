<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="link-underline-overview">
    <NmorphLink>Without underline</NmorphLink>
    <NmorphLink underline>Underlined</NmorphLink>
  </div>
</template>

<style lang="scss">
.link-underline-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
