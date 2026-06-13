<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Cat, Dog, Racoon } from "~/assets/images";
</script>

<template>
  <div class="avatar-size-overview">
    <NmorphAvatar :src="Dog" :size="70" />
    <NmorphAvatar :src="Cat" :size="50" />
    <NmorphAvatar :src="Racoon" :size="40" />
  </div>
</template>

<style lang="scss">
.avatar-size-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
