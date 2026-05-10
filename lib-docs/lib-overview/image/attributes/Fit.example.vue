<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
import { CatReal } from "~/assets/images";
</script>

<template>
  <div class="image-fit-overview">
    <ClientOnly>
      <div class="image-fit-overview__wrapper">
        <NmorphImage :src="CatReal" fit="contain" />
      </div>
      <div class="image-fit-overview__wrapper">
        <NmorphImage :src="CatReal" fit="fill" />
      </div>
      <div class="image-fit-overview__wrapper">
        <NmorphImage :src="CatReal" fit="cover" />
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-fit-overview {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .image-fit-overview__wrapper {
    width: 200px;
    height: 200px;
    margin-right: 16px;
  }
}
</style>
