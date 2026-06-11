<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="image-load-failed-text-overview">
    <ClientOnly>
      <NmorphImage
        src="./error.jpg"
        width="300px"
        height="300px"
        load-failed-text="Custom error text"
      />
    </ClientOnly>
    <ClientOnly>
      <NmorphImage src="./error.jpg" width="300px" height="300px">
        <template #error>Load error</template>
      </NmorphImage>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-load-failed-text-overview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  width: 100%;
}
</style>
