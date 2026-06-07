<script setup lang="ts">
import {
  NmorphIcon,
  NmorphIconLoader,
  NmorphImage,
} from "@nmorph/nmorph-ui-kit";

const imageSrc = ref("https://httpstat.us/200?sleep=300000");

const errorHandler = () => {
  imageKey.value += 1;
};

const imageKey = ref(0);
</script>

<template>
  <div class="image-loading-text-overview">
    <ClientOnly>
      <NmorphImage :src="imageSrc" @error="errorHandler" :key="imageKey" />
    </ClientOnly>
    <ClientOnly>
      <NmorphImage :src="imageSrc" @error="errorHandler" :key="imageKey">
        <template #loading>
          <NmorphIcon class="image-loading-text-overview__loader" size="large">
            <NmorphIconLoader />
          </NmorphIcon>
        </template>
      </NmorphImage>
    </ClientOnly>
  </div>
</template>

<style lang="scss">
.image-loading-text-overview {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  .nmorph-image {
    --width: 300px;
    --height: 300px;
    margin-right: 16px;
    margin-bottom: 8px;
  }

  &__loader {
    --nmorph-private-icon-color: var(--nmorph-accent-color);
  }
}
</style>
