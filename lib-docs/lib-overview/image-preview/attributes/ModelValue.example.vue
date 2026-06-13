<script setup lang="ts">
import { NmorphImagePreview, NmorphButton } from "@nmorph/nmorph-ui-kit";
import { Winter } from "@/assets/images";

const show = ref(false);

const showHandler = () => {
  show.value = true;
};
</script>

<template>
  <div class="image-preview-model-value-overview">
    <NmorphImagePreview
      v-model="show"
      :src="Winter"
      :width="76"
      :height="76"
      preview-width="min(92vw, 840px)"
      preview-height="min(72vh, 560px)"
    />
    <NmorphButton text="Show" design="plain" @click="showHandler" />
  </div>
</template>

<style lang="scss">
.image-preview-model-value-overview {
  .nmorph-button {
    margin-top: 8px;
  }
}
</style>
