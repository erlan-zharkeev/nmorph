<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";
</script>

<template>
  <div class="image-preview-initial-index-overview">
    <ClientOnly>
      <NmorphImagePreview
        :src="[Summer, Spring, Winter, Autumn]"
        :initial-index="3"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-preview-initial-index-overview {
  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
  }
}
</style>
