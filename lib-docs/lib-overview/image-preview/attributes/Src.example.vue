<script setup lang="ts">
import { NmorphImagePreview } from "@nmorph/nmorph-ui-kit";
import { Spring, Summer, Autumn, Winter } from "@/assets/images";
</script>

<template>
  <div class="image-preview-src-overview">
    <ClientOnly>
      <NmorphImagePreview
        :src="Spring"
        :width="76"
        :height="76"
        preview-width="min(92vw, 840px)"
        preview-height="min(72vh, 560px)"
      />
      <NmorphImagePreview
        :src="[Summer, Spring, Winter, Autumn]"
        :width="76"
        :height="76"
        preview-width="min(92vw, 840px)"
        preview-height="min(72vh, 560px)"
      />
      <NmorphImagePreview
        :src="[Summer, Spring, Winter, Autumn]"
        trigger-view="gallery"
        :trigger-limit="3"
        :width="108"
        :height="108"
        preview-width="min(92vw, 840px)"
        preview-height="min(72vh, 560px)"
      />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-preview-src-overview {
  display: flex;
  flex-wrap: wrap;

  .nmorph-image-preview {
    margin-right: 8px;
  }
}
</style>
