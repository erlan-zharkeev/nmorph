<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import { Dog, Racoon } from "~/assets/images";
</script>

<template>
  <div class="avatar-shape-overview">
    <ClientOnly>
      <NmorphAvatar :src="Dog" :size="70" shape="square" />
      <NmorphAvatar :src="Racoon" :size="70" shape="circle" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.avatar-shape-overview {
  display: flex;
  align-items: center;

  .nmorph-avatar {
    margin-right: 12px;
  }
}
</style>
