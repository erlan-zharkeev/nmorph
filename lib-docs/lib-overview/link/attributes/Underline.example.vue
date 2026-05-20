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
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
