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
        :width="76"
        :height="76"
        preview-width="min(92vw, 840px)"
        preview-height="min(72vh, 560px)"
      />
    </ClientOnly>
  </div>
</template>
