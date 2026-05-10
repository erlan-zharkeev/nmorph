<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";
</script>

<template>
  <div class="image-preview-src-overview">
    <ClientOnly>
      <NmorphImagePreview :src="Spring" />
      <NmorphImagePreview :src="[Summer, Spring, Winter, Autumn]" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-preview-src-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
    margin-right: 8px;
  }
}
</style>
