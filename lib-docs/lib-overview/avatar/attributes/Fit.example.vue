<script setup lang="ts">
import { NmorphAvatar } from "@nmorph/nmorph-ui-kit";
import CatReal from "~/assets/images/cat-real.png";
</script>

<template>
  <div class="avatar-fit-overview">
    <ClientOnly>
      <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="cover" />
      <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="contain" />
      <NmorphAvatar :src="CatReal" :size="100" shape="square" fit="fill" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.avatar-fit-overview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .nmorph-avatar {
    margin: 0 12px;
  }

  .nmorph-avatar:last-child {
    margin-top: 8px;
  }
}
</style>
