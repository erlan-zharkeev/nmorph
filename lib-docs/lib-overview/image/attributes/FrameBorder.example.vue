<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
import { CatReal } from "~/assets/images";
</script>

<template>
  <div class="image-frame-border-overview">
    <ClientOnly>
      <NmorphImage
        :src="CatReal"
        width="180px"
        height="180px"
        :frame-border="0"
      />
      <NmorphImage
        :src="CatReal"
        width="180px"
        height="180px"
        :frame-border="2.67"
      />
      <NmorphImage
        :src="CatReal"
        width="180px"
        height="180px"
        :frame-border="8"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-frame-border-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  width: 100%;
}
</style>
