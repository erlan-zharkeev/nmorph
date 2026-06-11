<script setup lang="ts">
import { NmorphButton } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="button-shape-overview">
    <NmorphButton>Default</NmorphButton>
    <NmorphButton shape="circle" thickness="thick">Circle</NmorphButton>
    <NmorphButton shape="round">Round</NmorphButton>
    <NmorphButton shape="square" thickness="thick">Square</NmorphButton>
  </div>
</template>

<style lang="scss">
.button-shape-overview {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
}
</style>
