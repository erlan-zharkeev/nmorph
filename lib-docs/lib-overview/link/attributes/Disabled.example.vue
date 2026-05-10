<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="link-disabled-overview">
    <NmorphLink disabled type="accent">Accent</NmorphLink>
    <NmorphLink disabled type="success">Success</NmorphLink>
    <NmorphLink disabled type="warning">Warning</NmorphLink>
    <NmorphLink disabled type="error">Error</NmorphLink>
  </div>
</template>

<style lang="scss">
.link-disabled-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
