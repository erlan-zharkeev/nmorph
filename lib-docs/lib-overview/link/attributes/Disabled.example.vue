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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
