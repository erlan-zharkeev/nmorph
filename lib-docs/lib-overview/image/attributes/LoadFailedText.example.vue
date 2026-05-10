<script setup lang="ts">
import { NmorphImage } from "@nmorph/nmorph-ui-kit";
</script>

<template>
  <div class="image-load-failed-text-overview">
    <ClientOnly>
      <ClientOnly>
        <NmorphImage src="./error.jpg" load-failed-text="Custom error text" />
      </ClientOnly>
      <ClientOnly>
        <NmorphImage src="./error.jpg">
          <template #error>{{ $t("overview.load-error") }}</template>
        </NmorphImage>
      </ClientOnly>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-load-failed-text-overview {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .nmorph-image {
    --width: 300px;
    --height: 300px;
    margin-right: 16px;
    margin-bottom: 8px;
  }
}
</style>
