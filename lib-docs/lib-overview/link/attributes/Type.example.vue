<script setup lang="ts">
import { NmorphLink } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="link-type-overview">
    <NmorphLink type="accent">Accent</NmorphLink>
    <NmorphLink type="success">Success</NmorphLink>
    <NmorphLink type="warning">Warning</NmorphLink>
    <NmorphLink type="error">Error</NmorphLink>
  </div>
</template>

<style lang="scss">
.link-type-overview {
  .nmorph-link {
    margin: 0 8px;
  }
}
</style>
