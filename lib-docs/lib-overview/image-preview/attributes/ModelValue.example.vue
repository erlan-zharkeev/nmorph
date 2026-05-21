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
    <ClientOnly>
      <NmorphImagePreview v-model="show" :src="Winter" />
      <NmorphButton text="Show" @click="showHandler" />
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-preview-model-value-overview {
  .nmorph-image-preview {
    --width: 200px;
    --height: 200px;
  }

  .nmorph-button {
    margin-top: 8px;
    width: 100%;
  }
}
</style>
